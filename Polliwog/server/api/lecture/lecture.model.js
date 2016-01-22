/**
 * lecture.model.js
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
  Schema = mongoose.Schema,
  slug = require('slug');

/**
 * A lecture is a kind of lecture that is given to an attendance by a
 * speaker. This is the root document from which one can retrieve polls
 * resources, listeners list and moods. A lecture is defined by the
 * following properties:
 *
 * - id. An automatic identifier is assigned to the lecture by MongoDB.
 * A user (speaker) interacts with the API lecture endpoint by means of
 * the lecture id.
 *
 * - key. A lecture key is used by a user (speaker) in order to allow
 * other users (listeners) to join his lecture. This key is generated
 * on server side and should be unique in order for a user (listener)
 * to identify a lecture, not by its assigned identifier.
 *
 * - name. A lecture is titled by a mandatory name.
 *
 * - description. A lecture is describe by a mandatory description.
 *
 * - creationDate: A lecture is characterized by a creation date. It may
 * seem strange to store such a data given that a lecture is supposed
 * to be temporary. This date is used as a reference for moods statistics.
 *
 * - isPrivate. The web applications is provided with two types of lectures
 * which are public ones and private ones. The type of a given lecture is
 * defined by a boolean flag indicating whether it is public (false) or
 * private (true). A lecture is by default considered to be public in case
 * of a user (speaker) having not specified its type.
 *
 * - speaker. A lecture belongs to a user (speaker). This field basically
 * consists of referencing the parent user. Mechanisms of DELETE ON CASCADE
 * and UPDATE ON CASCADE should be implemented in order to ensure database
 * consistency.
 *
 * - listeners. A lecture is hold by a user (speaker) to other users (listeners).
 * these listeners are stored by means of an array of references. Mechanisms
 * of DELETE ON CASCADE and UPDATE ON CASCADE should be implemented in order
 * to ensure database consistency.
 *
 * - moods. It is expected from listeners to give a feedback about their
 * mood throughout the speaker lecture. This feedback is gathered in an array.
 * That's the purpose of the moods field.
 *
 * - polls. Any questions poll belongs to only one lecture. This is done by means
 * of an array of poll references. Mechanisms of DELETE ON CASCADE and UPDATE ON
 * CASCADE should be implemented in order to ensure database consistency.
 *
 * - resources. A user (speaker) may share resources with the audience (listeners).
 * It can be URLs, files, etc. These kind of resources belong therefore to a
 * lecture. They are stored by means in a references array.
 */
var LectureSchema = new Schema({
  key: { type: String, unique: true },
  name: { type: String, trim: true, required: true, maxlength: 30 },
  slug: {type: String, trim: true, required: false},  // TODO: require : true
  description: { type: String, trim: true, required: true, maxlength: 120 },
  creationDate: { type: Date, default: Date.now },
  isPrivate: { type: Boolean, default: false },
  speaker: { type: Schema.ObjectId, ref: 'User', required: true },
  listeners: [{ type: Schema.ObjectId, ref: 'User' }],
  moods: [{ type: Schema.ObjectId, ref: 'Mood' }],
  polls: [{ type: Schema.ObjectId, ref: 'Poll' }],
  resources: [{ type: Schema.ObjectId, ref: 'Resource' }]
});


LectureSchema
  .virtual('url')
  .get(function () {
    return '/presentations/' + this.key;
  });
/**
 * Middleware function executed before every lecture removal.
 *
 * The purpose of this middleware is to implement the common mechanism
 * of DELETE ON CASCADE that one can retrieve in relational databases. It
 * also implements UPDATE ON CASCADE since parent user stores a reference
 * to his lectures.
 */
LectureSchema.pre('remove', function (next) {

	/**
	* Update parent user's array of lectures.
   * TODO add lecture attr in UserSchema
	*/
	//var User = mongoose.model('User');
	//User.findByIdAndUpdate(this.speaker, { $pull: { lectures: this._id } });

	/**
	* Remove every poll related with the current lecture.
	*
	* Notice that it iterates through each poll. This is necessary for
	* triggering the question and participation middlewares which will
	* apply the same mechanism of DELEATE ON CASCADE and/or UPDATE ON
	* CASCADE.
	*
	* Further information on: http://mongoosejs.com/docs/populate.html
	*/
	var Poll = mongoose.model('Poll');
	Poll.find({ lecture: this._id }, function (err, polls) {
		if (err) { console.log(err); return; }
		polls.forEach(function (poll) {
     poll.remove();
    });
	});


	next();
});

/**
 * Middleware function executed before each lecture insertion/update.
 *
 * The purpose of this function is to set a flag indicating whether it
 * is an update or an insertion. This flag is used for post save event.
 */
LectureSchema.pre('save', function (next) {
  this.wasNew = this.isNew;
  this.slug = slug(this.name);
	next();
});

// TODO: update slug on findOneAndUpdate
//LectureSchema.post('findOneAndUpdate', function (next) {
//  //this.slug = slug(this.name);
//  next();
//});

/**
 * Middleware function executed after each lecture insertion/update.
 *
 * The purpose of this function is to update parent user's array of lectures
 * in order to maintain both sides references consistency.
 *
 * The body of the function is executed only after an insertion. In the case
 * of an update, the algorithm will not be executed. This is ensured by the
 * test on the flag wasNew defined on pre save event.
 */
LectureSchema.post('save', function () {
	var User = mongoose.model('User');
	if (this.wasNew) { User.findByIdAndUpdate(this.speaker, { $push: { lectures: this._id } }, function (err) {
    if(err) console.error(err);
  }); }


});

module.exports = mongoose.model('Lecture', LectureSchema);
