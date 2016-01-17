'use strict';

angular.module('polliwogApp')
  .controller('AddLectureCtrl', function ($log, $scope, $mdDialog, Lecture) {
  	$scope.showEditTab = true;
    $scope.showShareTab = false;
    $scope.saved = false;
    $scope.lecture = {isPrivate: false};
  	$scope.joinUrl = 'http://polliwog.com/join';
  	$scope.visibilities = ('Public:false;Private:true').split(';').map(function (v) {
  		var args = v.split(':');
  		return {
  			label: args[0],
  			value: args[1]
  		};
  	});


  	$scope.cancel = function () {
      if($scope.lecture.hasOwnProperty('_id')) // delete only if exist
  		  Lecture.delete({id: $scope.lecture._id});
      $mdDialog.cancel();
  	};

  	$scope.finished = function () {
      $mdDialog.hide();
  	};

    $scope.save = function (form) {
        if(form.$valid) {
          console.log('valid');
          $scope.next();
        } else {
          console.error('no valid');
        }
    };

    $scope.next = function () {

      // update if was already saved
      if($scope.lecture.hasOwnProperty('_id')){
        $scope.lecture.$update(function (lecture) {
          $scope.lecture = lecture;
          $log.debug({'updated': lecture});
        });

      // save if is new
      } else {
        Lecture.save({}, $scope.lecture, function (lecture) {
          $scope.lecture = lecture;
          $log.debug({'saved': lecture});
        });
      }


      $scope.showShareTab = true;
      $scope.showEditTab = false;
      $scope.saved = true;
    };

    $scope.back = function () {
      $scope.showShareTab = false;
      $scope.showEditTab = true;
    };
  });
