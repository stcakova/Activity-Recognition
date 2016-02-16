'use strict';

angular.module('activityRecognition')
  .service('InitializeData', function(lodash, $http, $q) {

  var activities = ['Sitting', 'Walking', 'Jogging', 'Standing', 'Upstairs', 'Downstairs'],
      data = {};

  function getData(activity) {
    var defered = $q.defer(),
        path = 'data/' + activity + '.json';

    $http.get(path).then(
      function (result) {
        data[activity] = result.data;
        defered.resolve();
    }, function() {
      console.error('Error during loading data for ', activity);
    });

    return defered.promise;
  }

  function getActivitiesData() {
    return data;
  }

  function initData() {
    var promises = [];

    _.each(activities, function(activity) {
      var promise = getData(activity);
      promises.push(promise);
    });

    return $q.all(promises);
  }

    return {
     initData: initData,
     getActivitiesData: getActivitiesData
    };
  });