'use strict';

angular.module('juk', [
  'ui.bootstrap',
  // 'juk.controllers',
  'juk.account', 'juk.friends', 'juk.menu', 'juk.music', 'juk.musicsearch', 'juk.parties',
  'juk.directives',
  'juk.services'
  ])
.config(function ($locationProvider, $httpProvider) {
  
    // Intercept 401s and redirect you to login
    $httpProvider.interceptors.push(['$q', '$location', function($q, $location) {
      return {
        'responseError': function(response) {
          if(response.status === 401) {
            $location.path('/');
            return $q.reject(response);
          }
          else {
            return $q.reject(response);
          }
        }
      };
    }]);
  })
.run(function ($rootScope, $location) {
    // Redirect to login if route requires auth and you're not logged in
    $rootScope.$on('$routeChangeStart', function (event, next) {
    });
  });