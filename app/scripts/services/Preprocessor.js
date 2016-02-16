'use strict';

angular.module('activityRecognition').service('Preprocessor', function(lodash, InitializeData) {

	var data = InitializeData.getActivitiesData(),
		testData = {},
		learningData = {},
		testMagnitudeData ={},
		learningMagnitudeData ={};

	function rawTestData () {
		return testData;
	}


	function rawLearningData () {
		return learningData;
	}

	function getTestData () {

		_.each(data, function(value, activity) {
			var dataTestLength = Math.floor(0.7 * value.length);

			testData[activity] = _.drop(value, dataTestLength);
		});

		convertToMagnitude(testData, testMagnitudeData);

	}


	function getLearningData () {
		_.each(data, function(value, activity) {
			var dataTestLength = Math.floor(0.7 * value.length);

			learningData[activity] = _.dropRight(value, data[activity].length - dataTestLength);
		});

		convertToMagnitude(learningData, learningMagnitudeData);
	}

	function getAverageAccelleration(data) {
		var sumX = 0,
			sumY = 0,
			sumZ = 0,
			len = data.length;

		for (var i = len - 1; i >= 0; i--) {
			sumX += data[i][0];
			sumY += data[i][1];
			sumZ += data[i][2];
		}
 
		return [sumX / len, sumY / len, sumZ / len];
	}

	function getAverageMagnitude(data) {
        var sum = 0,
            len = data.length;

        for (var i = 0; i < len; i++) {
            sum += data[i];
        }

        return sum / len;
    }

	function calculateMagnitude(arr) {
		return Math.sqrt(_.reduce(arr, function(sum, n) {
			return sum + n*n;
		}, 0));
	}
 
	function convertToMagnitude (dataSet, resultSet) {
		_.each(dataSet, function (value, activity) {
			var result = [];

			_.each(value, function(personActivity){
				var tmp = [];

				_.each(personActivity, function(vector) {
					tmp.push(calculateMagnitude(vector));
				});

				result.push(tmp);
			});
			resultSet[activity] = result;
		});
	}

	function getTestMagnitude () {
		return testMagnitudeData;
	}

	function getLearningMagnitude () {
		return learningMagnitudeData;
	}

	(function init() {
		getLearningData();
		getTestData();
	})();

	return {
		getLearningMagnitude: getLearningMagnitude,
		getTestMagnitude: getTestMagnitude,
		averageAccelleration: function(data, activity, index) { 
			return getAverageAccelleration(data[activity][index]);
		},
		getAverageMagnitude: getAverageMagnitude,
		rawLearningData: rawLearningData,
		rawTestData: rawTestData,
		calculateMagnitude: calculateMagnitude
	};
});