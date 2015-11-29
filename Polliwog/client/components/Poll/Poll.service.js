'use strict';

angular.module('polliwogApp')
  .factory('Poll', function (Session) {
    // logic here

    // Public API here
    return {
      list: function (sessionId) {

        var sessions = Session.list();

        for(var i=0; i < sessions.length; i++)
          if(sessions[i].id == sessionId) {
            return sessions[i].polls;
          }

        return [];
      }
    };
  });
