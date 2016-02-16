'use strict';

angular.module('activityRecognition').service('KeyValues', function(lodash, NoiseReductor, Preprocessor, FftUtil, Fft, BitTwiddle) {

  var OFFSET = 10;

	function averageAmplitudes (arr) {
        var sum = 0;
        for (var i = arr.length - 1; i >= 0; i--) {
            sum += arr[i][0];
        };
        return sum/arr.length;
    };

    function getKeyData(arr){
        var result = [];
        var first = arr[0][0];
        var averageFreq = (arr[OFFSET][1] + arr[OFFSET+1][1] + arr[OFFSET+2][1])/ 3;
        var dominantAmplitude = arr[OFFSET][0];
        var minAmpl = arr[arr.length - OFFSET][0];
        var averageAmplitude = averageAmplitudes(arr.slice(OFFSET, arr.length - OFFSET));

        result.push(averageFreq);
        result.push(dominantAmplitude);
        result.push(minAmpl);
        result.push(averageAmplitude);

        return result;
    };

    function getAllKeyValues(dataSet, type) {
        var result = [];
        var tmp;

        _.each(dataSet, function (value, activity) {
            for (var i = 0; i < value.length ; i++) {
               
                tmp = [];
                var clearedSignal = NoiseReductor.clearSignal(value[i]),
                    fftTransformed = Fft.fft(clearedSignal.slice(0, BitTwiddle.prevPow2(clearedSignal.length))),
                    fftAmpl = FftUtil.fftAmpl(fftTransformed, 0.4, 20),
                    keyData = getKeyData(fftAmpl),
                    avgAcc = Preprocessor.averageAccelleration(type,activity,i),
                    avgMag = Preprocessor.getAverageMagnitude(value[i]);

                result.push(tmp.concat(keyData).concat(avgAcc).concat(avgMag).concat(activity));
            };
        });
        return result;
    }
    return {
    	getKeyData: getKeyData,
      getAllKeyValues: getAllKeyValues
    };
});