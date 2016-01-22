/**
 * Created by paulnta on 22.01.16.
 */

angular.module('polliwogApp')
  .controller('DialogShareLectureCtrl', function ($scope, $mdDialog, lecture) {
    $scope.lecture = lecture;
    $scope.joinUrl = 'http://polliwog-app.herokuapp.com/join';
    $scope.cancel = function () {
        $mdDialog.cancel();
    };
  });
