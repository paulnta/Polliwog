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
  .controller('QuestionsCtrl', function ($scope, $resource, Lecture, $http) {

    $scope.lectures = Lecture.list();

    console.log($scope.lectures);

    $scope.saveLecture = function () {
      console.log('save Lecture');
      Lecture.api.save($scope.lecture, function (lecture) {
        console.log(lecture);
        Lecture.list();
        $scope.lectures.push($scope.lecture);
        $scope.lecture = {name: lecture.name, description: lecture.description};
      });
    };


  });
