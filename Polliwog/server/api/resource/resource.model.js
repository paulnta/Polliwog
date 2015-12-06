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

/**
 * A resource is a kind of data that a speaker makes available to its
 * audience. This data can be a text, a link or even a file for which
 * it is possible to preview its content or to download it. A resource
 * is defined by the following properties:
 *
 * - lecture: It belongs to a lecture since a speaker may want to share
 * resources only to a given audience. Of course, it is still possible
 * to him to share those amongst his lectures.
 *
 * - title: A title characterizes a resource.
 *
 * - subhead: A subhead come withe the resource title. Its purpose is to
 * provide a more detailed description about the resource.
 *
 * - creationDate: A creation date is stored, This makes possible to the
 * audience to known which resource has been added recently.
 *
 * - text: A resource has a content and its content is displayed as a text.
 * This text could be a post, a note, a reminder, a link et al.
 *
 * - file: The speaker is provided with a file support. It allows him to
 * share files to his audience. Lecture listeners would be able to see its
 * content by previewing it or by downloading it.
 *
 */
var ResourceSchema = new Schema({
  lecture: { type: Schema.ObjectId, ref: 'Lecture', required: true },
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
 * also implements UPDATE ON CASCADE since parent lecture stores a reference 
 * to its resources. 
 */ 
ResourceSchema.pre('remove', function (next) {
	var Lecture = mongoose.model('Lecture');
	Lecture.findByIdAndUpdate(this.lecture, { $pull: { resources: this._id } });
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
 * The purpose of this function is to update parent lecture's array of resources 
 * in order to maintain both sides references consistency.
 * 
 * The body of the function is executed only after an insertion. In the case  
 * of an update, the algorithm will not be executed. This is ensured by the
 * test on the flag wasNew defined on pre save event. 
 */ 
ResourceSchema.post('save', function () {
	var Lecture = mongoose.model('Lecture');
	if (this.wasNew) {Lecture.findByIdAndUpdate(this.lecture, { $push: { resources: this._id } }); }
});

module.exports = mongoose.model('Resource', ResourceSchema);