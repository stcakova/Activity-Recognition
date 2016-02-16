'use strict';

angular.module('activityRecognition')
  .directive('timeout', function(LoadingTimer) {
    return {
      scope: {},
      templateUrl: 'views/timeout-popup.html',
      restrict: 'E',
      link: function(scope) {
        function setLoading(value) {
          scope.loading = value;
        }

        LoadingTimer.addListener(setLoading);

        scope.$on('$destroy', function() {
          LoadingTimer.removeListener(setLoading);
        });
      }
    };
  });