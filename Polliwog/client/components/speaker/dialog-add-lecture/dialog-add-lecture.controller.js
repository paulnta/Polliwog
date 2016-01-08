'use strict';

angular.module('polliwogApp')
  .controller('AddLectureCtrl', function ($scope, $mdDialog) {
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

  	};

  	$scope.cancel = function () {
  		
  	};

  	$scope.finished = function () {

  	};

  });