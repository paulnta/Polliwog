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

  .factory('TargetUrl', function () {
    var targetUrl = null;

    return {
        setUrl : function (url) {
          targetUrl = url;
        },

        isEmpty : function () {
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

  .factory('authInterceptor', function ($rootScope, $q, $cookieStore, $location, TargetUrl) {
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
      responseError: function(response) {
        if(response.status === 401) {
          TargetUrl.setUrl($location.url());
          console.log("target: " + TargetUrl.getUrl());
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

  .run(function ($rootScope, $stateParams, Auth, $state, TargetUrl, $location) {
    // Redirect to login if route requires auth and you're not logged in
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {

    //if( toState.data && toState.data.authenticate            // the state need an authentication
    //      && !Auth.hasRole(toState.data.authenticate.role)){ // has not required role
    //    event.preventDefault();
    //    //TargetUrl.setUrl($location.url());
    //    $state.go('login');                                   // redirect to login
    //  }
    });
  });





