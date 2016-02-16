'use strict';

angular.module('activityRecognition')
  .service('LoadingTimer', function(lodash) {
    var counter = 0,
      listeners = [];

    function increment() {
      counter++;
      notify();
    }

    function decrement() {
      counter--;
      notify();
    }

    function notify() { 
      var loading = counter !== 0;
      lodash.invoke(listeners, 'call', null, loading);
    }

    function addListener(fn) {
      listeners = lodash.union(listeners, [fn]);
      var loading = counter !== 0;
      fn(loading);
    }

    function removeListener(fn) {
      listeners = lodash.without(listeners, fn);
    }

    return {
      increment: increment,
      decrement: decrement,
      addListener: addListener,
      removeListener: removeListener
    };
  });