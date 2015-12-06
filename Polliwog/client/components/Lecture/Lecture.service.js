'use strict';

angular.module('polliwogApp')
  .factory('Lecture', function ($state) {
    // logic here

    // test data
   var lectures = [
     {
       title: 'Lecture 1',
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
         },
         {
           title: 'poll12',
           id: 12
         },
         {
           title: 'poll13',
           id: 13
         },
         {
           title: 'poll12',
           id: 12
         },
         {
           title: 'poll12',
           id: 12
         },
         {
           title: 'poll13',
           id: 13
         },
         {
           title: 'poll12',
           id: 12
         },
         {
           title: 'poll12',
           id: 12
         },
         {
           title: 'poll13',
           id: 13
         },
         {
           title: 'poll12',
           id: 12
         }

       ],
       id: 1
     },
     {
       title: 'lecture 2',
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
       title: 'lecture 3',
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
        return lectures;
      },

      current: function () {
        return $state.params.lectureId;
      },

      getTitle: function (lectureId) {
        for(var i=0; i < lectures.length; i++){
          if(lectures[i].id == lectureId){
            return lectures[i].title;
          }
        }
        return '';
      }
    };
  });
