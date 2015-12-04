/**
 * session.model.js
 *
 * Created on: 2015-11-29
 *
 * Author: Eléonore d'Agostino (paranoodle)
 * Author: Karim Ghozlani (gweezer7)
 * Author: Yassin Kammoun (yibnl)
 * Author: Paul Ntawuruhunga (paulnta)
 */

'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * A session is defined by the following properties:
 *
 * - id. An automatic identifier is assigned to the session by MongoDB.
 * A user (speaker) interacts with the API session endpoint by means of
 * the session id.
 *
 * - key. A session key is used by a user (speaker) in order to allow 
 * other users (listeners) to join his lecture. This key is generated 
 * on server side and should be unique in order for a user (listener)
 * to identify a session, not by its assigned identifier.
 *
 * - name. A session is titled by a mandatory name.
 *
 * - description. A session is describe by a mandatory description.
 *
 * - isPrivate. The web applications provides with two types of sessions 
 * which are public ones and private ones. The type of a given session is
 * defined by a boolean flag indicating whether it is public (false) or 
 * private (true). A session is by default considered to be public in case
 * of a user (speaker) having not specified its type.
 *
 * - speaker. A session belongs to a user (speaker). This field basically
 * consists of referencing the parent user. Mechanisms of DELETE ON CASCADE
 * and UPDATE ON CASCADE should be implemented in order to ensure database
 * consistency.
 *
 * - listeners. A session is hold by a user (speaker) to other users (listeners).
 * these listeners are stored by means of an array of references. Mechanisms 
 * of DELETE ON CASCADE and UPDATE ON CASCADE should be implemented in order   
 * to ensure database consistency.
 *
 * - moods. It is expected from listeners to give a feedback about their 
 * mood throughout the speaker session. This feedback is gathered in an array. 
 * That's the purpose of the moods field.
 *
 * - polls. Any questions poll belongs to only one session. This is done by means
 * of an array of poll references. Mechanisms of DELETE ON CASCADE and UPDATE ON 
 * CASCADE should be implemented in order to ensure database consistency. 
 *
 * - resources. A user (speaker) may share resources with the audience (listeners).
 * It can be URLs, files et al. These kind of resources belong therefore to a
 * session. They are stored by means of an array of references.
 */
var SessionSchema = new Schema({
  key: { type: String, unique: true },
  name: { type: String, trim: true, required: true, maxlength: 30 },
  description: { type: String, trim: true, required: true, maxlength: 120 },
  creationDate: { type: Date, default: Date.now },
  isPrivate: { type: Boolean, default: false },
  speaker: { type: Schema.ObjectId, ref: 'User', required: true },
  listeners: [{ type: Schema.ObjectId, ref: 'User' }],
  moods: [{ type: Schema.ObjectId, ref: 'Mood' }],
  polls: [{ type: Schema.ObjectId, ref: 'Poll' }],
  resources: [{ type: Schema.ObjectId, ref: 'Resource' }]
});

/** 
 * Middleware function executed before every session removal. 
 * 
 * The purpose of this middleware is to implement the common mechanism 
 * of DELETE ON CASCADE that one can retrieve in relational databases. It 
 * also implements UPDATE ON CASCADE since parent user stores a reference 
 * to his sessions. 
 */ 
SessionSchema.pre('remove', function (next) {
	/**
	 * Update parent user's array of sessions.
	 */
	var User = mongoose.model('User');
	User.findByIdAndUpdate(this.speaker, { $pull: { sessions: this._id } });

	/**
	 * Remove every poll related with the current session.
	 *
	 * Notice that it iterates through each poll. This is necessary for
	 * triggering the question and participation middlewares which will
	 * apply the same mechanism of DELEATE ON CASCADE and/or UPDATE ON
	 * CASCADE.
	 *
	 * Further information on: http://mongoosejs.com/docs/populate.html
	 */
	var Poll = mongoose.model('Poll');
	Poll.find({ session: this._id }, function (err, polls) { 
		if (err) { console.log(err); return; } 
		polls.forEach(function (poll) { poll.remove(); }); 
	});

	/**
	 * Remove all moods related to the current session.
	 */
	var Mood = mongoose.model('Mood');
	Mood.remove({ session: this._id }, function (err) {
		if (err) { console.log(err); }
	});

	/**
	 * Remove all resources related to the current session.
	 */
	var Resource = mongoose.model('Resource');
	Resource.remove({ session: this._id }, function (err) {
		if (err) { console.log(err); }
	});

	next();
});

/** 
 * Middleware function executed before each session insertion/update. 
 * 
 * The purpose of this function is to set a flag indicating whether it 
 * is an update or an insertion. This flag is used for post save event.
 */
SessionSchema.pre('save', function (next) {
	this.wasNew = this.isNew;
	next();
});

/** 
 * Middleware function executed after each session insertion/update. 
 * 
 * The purpose of this function is to update parent user's array of sessions 
 * in order to maintain both sides references consistency.
 * 
 * The body of the function is executed only after an insertion. In the case  
 * of an update, the algorithm will not be executed. This is ensured by the
 * test on the flag wasNew defined on pre save event. 
 */ 
SessionSchema.post('save', function () {
	var User = mongoose.model('User');
	if (this.wasNew) { User.findByIdAndUpdate(this.speaker, { $push: { sessions: this._id } }); }
});

module.exports = mongoose.model('Session', SessionSchema);