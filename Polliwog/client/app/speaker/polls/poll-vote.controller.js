/**
 * Created by paulnta on 17.01.16.
 */



angular.module('polliwogApp')
  .controller('PollsCtrl', function ($scope, Poll) {

    $scope.togglePollState = function (poll) {
      console.log(poll);
      switch (poll.state){
        case 'draft':
          startPoll(poll);
          break;
        case 'active':
          stopPoll(poll);
          break;
        case 'closed':
          restartPoll(poll);
          break;
      }
    };

    /**
     * Share a poll with audience
     * @param poll
     */
    function startPoll(poll) {
      console.log('start poll');
      poll.state = 'active';
      Poll.save({}, poll, function (poll) {
        console.log({'saved':poll});
        socket.socket.emit('poll:start', {poll:poll, key: $scope.currentLecture.key});
      });
    }

    function stopPoll(poll) {
      console.log('stop poll');
      poll.state = 'closed';
      Poll.save({}, poll);
    }

    function restartPoll(poll) {
      console.log('restart poll');
      poll.state = 'active';
      Poll.save({}, poll);
    }

  });
