'use strict';

angular.module('polliwogApp')
  .controller('AddLectureCtrl', function ($scope, $mdDialog, Lecture) {
  	$scope.lecture = {};
  	$scope.joinUrl = 'http://polliwog.com/join'
  	$scope.visibilities = ('Public:false;Private:true').split(';').map(function (v) {
  		var args = v.split(':');
  		return {
  			label: args[0],
  			value: args[1]
  		};
  	});

  	$scope.create = function () {
      var lecture = new Lecture($scope.lecture);
      lecture.$save({}, function (lecture) {
        $scope.lecture = lecture;
      });  
  	};

  	$scope.cancel = function () {
  		Lecture.delete({id: $scope.lecture._id});
      $mdDialog.cancel();
  	};

  	$scope.finished = function () {
      $mdDialog.hide();
  	};

  });