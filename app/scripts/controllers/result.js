'use strict';

angular.module('activityRecognition')
  .controller('ResultCtrl', function($scope, lodash, Classification, KeyValues, NoiseReductor, Preprocessor, FftUtil, Fft, BitTwiddle) {
   
    var testData = Preprocessor.getTestMagnitude(),
        learningData = Preprocessor.getLearningMagnitude(),
        test = Preprocessor.rawTestData(),
        learning = Preprocessor.rawLearningData();


    $scope.k = 1;
    $scope.activity = "Walking";

    $scope.calculate = function(){

        var learningCalculated = KeyValues.getAllKeyValues(learningData, learning, $scope.clear);
        var testCalculated = KeyValues.getAllKeyValues(testData, test);
        var count = 0;
        var countAll = 0;
        for (var i =  testCalculated.length - 1; i >= 0; i--) {
            if($scope.activity === testCalculated[i][8]){
                countAll++;
                if(testCalculated[i][8] === Classification.kNearestNeighbours(learningCalculated, testCalculated[i], $scope.k))
                {
                    count++;
                }
            }
        };

        $scope.output = "Efficiency with k = "+ $scope.k + " is " + (count/countAll)*100 + " %.";
    }

});