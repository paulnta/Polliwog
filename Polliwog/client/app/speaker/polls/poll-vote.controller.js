/**
 * Created by paulnta on 17.01.16.
 */



angular.module('polliwogApp')
  .controller('PollVoteCtrl', function ($scope, Poll, CurrentLecture, socket) {

    $scope.currentLecture = CurrentLecture;

    $scope.togglePollState = function (poll) {
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
      Poll.update({}, poll, function (poll) {
        socket.socket.emit('poll:start', {poll:poll, key: $scope.currentLecture.key});
      });
    }

    function stopPoll(poll) {
      poll.state = 'closed';
      Poll.update({}, poll, function () {
        socket.socket.emit('poll:stop', {poll:poll, key: $scope.currentLecture.key});
      });
    }

    function restartPoll(poll) {
      poll.state = 'active';
      Poll.update({}, poll, function (poll) {
        socket.socket.emit('poll:start', {poll:poll, key: $scope.currentLecture.key});
      });
    }

  });
