/**
 * resource.model.js
 *
 * Created on: 2015-12-04
 *
 * Author: Eléonore d'Agostino (paranoodle)
 * Author: Karim Ghozlani (gweezer7)
 * Author: Yassin Kammoun (yibnl)
 * Author: Paul Ntawuruhunga (paulnta)
 */

'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ResourceSchema = new Schema({
  session: { type: Schema.ObjectId, ref: 'Session', required: true },
  title: { type: String, trim: true, required: true },
  subhead: { type: String, trim: true, required: true },
  creationDate: { type: Date, default: Date.now },
  text: { type: String },
  file: { type: String }
});

/** 
 * Middleware function executed before every resource removal. 
 * 
 * The purpose of this middleware is to implement the common mechanism 
 * of DELETE ON CASCADE that one can retrieve in relational databases. It 
 * also implements UPDATE ON CASCADE since parent session stores a reference 
 * to its resources. 
 */ 
ResourceSchema.pre('remove', function (next) {
	var Session = mongoose.model('Session');
	Session.findByIdAndUpdate(this.session, { $pull: { resources: this._id } });
	next();
});

/** 
 * Middleware function executed before each resource insertion/update. 
 * 
 * The purpose of this function is to set a flag indicating whether it 
 * is an update or an insertion. This flag is used for post save event.
 */
ResourceSchema.pre('save', function (next) {
	this.wasNew = this.isNew;
	next();
});

/** 
 * Middleware function executed after each resource insertion/update. 
 * 
 * The purpose of this function is to update parent session's array of resources 
 * in order to maintain both sides references consistency.
 * 
 * The body of the function is executed only after an insertion. In the case  
 * of an update, the algorithm will not be executed. This is ensured by the
 * test on the flag wasNew defined on pre save event. 
 */ 
ResourceSchema.post('save', function () {
	var Session = mongoose.model('Session');
	if (this.wasNew) {Session.findByIdAndUpdate(this.session, { $push: { resources: this._id } }); }
});

module.exports = mongoose.model('Resource', ResourceSchema);