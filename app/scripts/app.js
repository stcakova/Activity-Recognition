'use strict';

var myApp = angular.module('activityRecognition', [
  'ui.router',
  'ngLodash',
]);

myApp.config(function($httpProvider, $stateProvider, $urlRouterProvider) {

  $httpProvider.defaults.withCredentials = true;

  $stateProvider.
 
  state('result', {
    controller: 'ResultCtrl',
    url: '/result',
    templateUrl: 'views/result.html',
    resolve: {
      data: function(InitializeData) {
        return InitializeData.initData();
      }
    }
  })

  $httpProvider.interceptors.push(function($q, $injector) {
    return {
      request: function(config) {
        var LoadingTimer = $injector.get('LoadingTimer');
        LoadingTimer.increment();
        return config;
      },
      response: function(response) {
        var LoadingTimer = $injector.get('LoadingTimer');
        LoadingTimer.decrement();
        return response;
      }
    };
  });

  $urlRouterProvider.otherwise('/result');
});