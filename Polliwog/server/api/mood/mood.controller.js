//client side
angular.module('PolliwogApp', [
  'chart.js',
  'btford.socket-io',
  'ui.router'
])

.controller('moodCtrl', function ($scope, Socket) {
//send the clicked mood to the server
  Socket.on('vote', function (data) {
    Socket.emit('vote', data);
  });

});
//-------------------------------------------------------------------------------------------

//server side
module.exports.register = function (socket) {
  socket.on('choose_mood', function (session) {
    // Find the right Session in the DB, selecting moods field
    Session.findOne(session.id, "moods").exec(function (err, session) {
      //retrieving its moods list
      var newData = session.moods;
      //add the new one
      newData.pushback(session.mood);
      //update the session with the new mood added
      Session.update({title: "TWEB"}, {moods: newData}).exec();
      //show to everyone this update
      socket.broadcast.emit('choose_mood', {moods: newData});
      socket.emit('choose_mood', {moods: newData});
    });
  });
};
