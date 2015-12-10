'use strict';

angular.module('polliwogApp')
  .controller('ThingCtrl', function ($scope, $resource) {
    $scope.message = 'Hello';

    var Thing = $resource('/api/things/:id', {id: '@_id'}, {
      update : {method: 'PUT'}
    });

    $scope.entry = new Thing();

    // get things
    $scope.things = Thing.query();

    $scope.save = function () {

      var p1 = new Promise(function (resolve, reject) {

        if ($scope.entry._id) {
          console.log('doing my stuff..');

          window.setTimeout(function () {
            console.log('i will reject because there is already an id');
            reject($scope.entry._id);
          }, 1000);

        } else {

          console.log('doing my stuff..');

          window.setTimeout(function () {
            console.log('i will save it');

            $scope.entry.$save(function (doc) {
              $scope.things.push(doc);
              resolve(doc);
            });

          },1000);

        }

      });

      p1.then(function (doc) {
        console.log('The promise is fullfiled');
        console.log(doc);


      }).catch(function (id) {
        console.log('there is an error because of ' + id);
      });

    };

    $scope.edit = function (thing) {
      $scope.entry = thing;
    };

    $scope.delete = function (thing, index) {
      thing.$delete(function () {
        console.log('thing deleted');
        $scope.things.splice(index, 1);
      });
    };

    function callbackSave(doc){
      console.log('thing saved');
      console.log(doc);
      $scope.things = Thing.query();
    }

  });
