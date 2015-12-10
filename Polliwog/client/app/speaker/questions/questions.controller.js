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
  .controller('QuestionsCtrl', function ($scope, $resource, $http) {
    $scope.message = "QuestionsCtrl";
    $scope.lecture = {};
    $scope.result = 'here the result';
    $scope.ok = false;

    var Lecture = $resource('/api/lectures/:id', {id: '@_id'});
    $scope.lectures = Lecture.query();

    $scope.saveLecture = function () {
      console.log('save Lecture');
      Lecture.save($scope.lecture, function (lecture) {
        console.log(lecture);
        $scope.lectures.push($scope.lecture);
        $scope.lecture = {name: lecture.name, description: lecture.description};
      });
    };

    $scope.test4 = function () {
      transformData(2).then(function (data) {
          $scope.result = data;
      });
    };

    function getData (index) {
      return singleRequest(index)
        .then(function (data) {
            return data;
        });
    }

   function transformData(index) {
     return getData(index)
        .then(function (data) {
          return data.toUpperCase();
        });
    }


    $scope.test2 = function () {

      var promise = new Promise(function () {
        console.log('hello promise');
      });

      promise.then(function (data) {
        console.info(data);
      });

      keepTrying(promise);

    };

    function keepTrying(promise) {

      console.log('try');

      if($scope.ok){
        promise.resolve('success');

      } else {

        setTimeout(function () {
          keepTrying(promise);
        }, Math.random() * 1000);

      }
    }


    $scope.test = function () {

      multiRequest(function () {
        console.log("FINISHED");
      });
    };


    function multiRequest(callback) {

      var numSuccess = 0;
      var n = 10;

      for(var i=0 ; i < n; i++){

        (function (index) {

          singleRequest(index)

            // success
            .then(function (data) {
              numSuccess++;
              console.log(data);
              console.log(numSuccess + '/' + n);

              // check if done
              if(numSuccess === n){
                callback();
              }

            // fail
            }).catch(function (reason) {
              console.error(reason);
            });

        })(i);
      }
    }

    function singleRequest(index) {

      return new Promise(function (resolve, reject) {

        setTimeout(function () {
          console.log('singleRequest ' + index);
          var data = "result of my request " + index;

          if(index !== 7)
            resolve(data);
          else
            reject('fail because 7 is not allowed');

        },Math.random() * 1000);
      });

    }


  });
