'use strict';

angular.module('activityRecognition').service('NoiseReductor', function(lodash, Preprocessor) {

	var gaussianCons = [0.242, 0.399, 0.242],
        testData = Preprocessor.getTestMagnitude(),
        learningData = Preprocessor.getLearningMagnitude();

	function clearSignal (arr) {
      var result = [];
      var len = arr.length;
      result[0] = arr[0];
      result[len-1] = arr[len-1];

      for (var i = len - 2; i > 0; i--) {
        result[i] = arr[i-1]* gaussianCons[0] +
                    arr[i]* gaussianCons[1] +
                    arr[i+1]* gaussianCons[2];
      };

      return result;
    }
  
    return {
    	clearSignal: clearSignal
    };
});