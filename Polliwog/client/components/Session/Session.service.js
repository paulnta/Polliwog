'use strict';

angular.module('polliwogApp')
  .factory('Session', function ($state) {
    // logic here

    // test data
   var sessions = [
     {
       title: 'Session 1',
       polls: [
         {
           title: 'poll11',
           id: 11
         },
         {
           title: 'poll12',
           id: 12
         },
         {
           title: 'poll13',
           id: 13
         }
       ],
       id: 1
     },
     {
       title: 'session 2',
       polls: [
         {
           title: 'poll21',
           id: 21
         },
         {
           title: 'poll22',
           id: 22
         },
         {
           title: 'poll23',
           id: 23
         }
       ],
       id: 2
     },
     {
       title: 'session 3',
       polls: [
         {
           title: 'poll31',
           id: 31
         },
         {
           title: 'poll32',
           id: 32
         },
         {
           title: 'poll33',
           id: 33
         }
       ],
       id: 3
     }
   ];

    // Public API here
    return {
      list: function () {
        return sessions;
      },

      current: function () {
        return $state.params.sessionId;
      }
    };
  });
