////client side
//angular.module('PolliwogApp', [
//  'chart.js',
//  'btford.socket-io',
//  'ui.router'
//])
//
//.controller('moodCtrl', function ($scope, Socket) {
////send the clicked mood to the server
//  Socket.on('vote', function (data) {
//    Socket.emit('vote', data);
//  });
//
//});
//-------------------------------------------------------------------------------------------

//server side
//module.exports.register = function (socket) {
//  socket.on('choose_mood', function (lecture) {
//    // Find the right Lecture in the DB, selecting moods field
//    Lecture.findOne(lecture.id, "moods").exec(function (err, lecture) {
//      //retrieving its moods list
//      var newData = lecture.moods;
//      //add the new one
//      newData.pushback(lecture.mood);
//      //update the lecture with the new mood added
//      Lecture.update({title: "TWEB"}, {moods: newData}).exec();
//      //show to everyone this update
//      socket.broadcast.emit('choose_mood', {moods: newData});
//      socket.emit('choose_mood', {moods: newData});
//    });
////  });
//};
