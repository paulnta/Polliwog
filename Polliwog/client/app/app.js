'use strict';

angular.module('polliwogApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'btford.socket-io',
  'ui.router',
  'ngMaterial',
  'headroom'
])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
    $httpProvider.interceptors.push('authInterceptor');
  })

/**
 * When an user tries to a state for which the user has no rights
 * the target url is stored in this service. He'll be redirected to this url
 * as soon as he is logged in.
 */
  .factory('TargetUrl', function () {
    var targetUrl = null;

    return {
      setUrl: function (url) {
        targetUrl = url;
      },

      isEmpty: function () {
        return targetUrl === null;
      },

      getUrl: function () {
        return targetUrl;
      },

      reset: function () {
        targetUrl = null;
      }
    };
  })

  .factory('authInterceptor', function ($rootScope, $q, $cookieStore, $location) {
    return {
      // Add authorization token to headers
      request: function (config) {
        config.headers = config.headers || {};
        if ($cookieStore.get('token')) {
          config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
        }
        return config;
      },

      // Intercept 401s and redirect you to login
      responseError: function (response) {
        if (response.status === 401) {
          $location.path('/login');
          // remove any stale tokens
          $cookieStore.remove('token');
          return $q.reject(response);
        }
        else {
          return $q.reject(response);
        }
      }
    };
  })

/**
 * redirect to login and save the target url if a state need an authorisation
 * and the user is not logged in or doesn't have the correct role
 */
  .run(function ($rootScope, $stateParams, Auth, $state, TargetUrl) {
    // Redirect to login if route requires auth and you're not logged in
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {

      if (toState.data && toState.data.authenticate               // the state need an authentication
        && !Auth.hasRole(toState.data.authenticate.role)) {        // has not required role
        event.preventDefault();
        TargetUrl.setUrl({name: toState.name, params: toParams});  // save the target url
        $state.go('login');                                       // redirect to login
      }

    });
  })

  .run(function ($rootScope, Lecture, $stateParams) {
    $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){

      if(toParams.lectureId) {
        Lecture.setCurrent(toParams.lectureId).then(function (lecture) {
          console.log({'set current lecture': lecture._id});
        });
      }

    })
  });





