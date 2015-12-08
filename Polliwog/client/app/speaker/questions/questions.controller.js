/**
 * Created by paulnta on 28.11.15.
 */
/**
 *
 * key: { type: String, unique: true },
 name: { type: String, trim: true, required: true, maxlength: 30 },
 description: { type: String, trim: true, required: true, maxlength: 120 },
 creationDate: { type: Date, default: Date.now },
 isPrivate: { type: Boolean, default: false },
 speaker: { type: Schema.ObjectId, ref: 'User', required: true },
 listeners: [{ type: Schema.ObjectId, ref: 'User' }],
 moods: [{ type: Schema.ObjectId, ref: 'Mood' }],
 polls: [{ type: Schema.ObjectId, ref: 'Poll' }],
 resources: [{ type: Schema.ObjectId, ref: 'Resource' }]
 */
angular.module('polliwogApp')
  .controller('QuestionsCtrl', function ($scope, $resource) {
    $scope.message = "QuestionsCtrl";



  });
