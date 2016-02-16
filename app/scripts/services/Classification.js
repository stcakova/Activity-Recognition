'use strict';

angular.module('activityRecognition').service('Classification', function(lodash, NoiseReductor, Preprocessor, FftUtil, Fft, BitTwiddle) {
  var distance = function(item1, item2) {
        var res = [];

        for (var i = 7; i >= 0; i--) {
            res[i]= item1[i] - item2[i];
        };
        
        return Preprocessor.calculateMagnitude(res);
    };

    var sort = function(sample, dataset) {
        return _.sortBy(dataset, function(item) {
            return distance(sample.slice(0, sample.length-1), item.slice(0, item.length-1));
        });
    };

    var topK = function(dataset, k) {
        return dataset.slice(0, k);
    };

    var classCount = function(dataset) {
        return _.countBy(dataset, function(item) {
            return item[8];
        });
    };

    var classify = function(dataset) {
        return _.max(_.pairs(dataset), function(item) {
            return item[1];
        })[0];
    };
    
    function kNN (data, elem, k) {
        var min = 10000, 
            type = "Sitting";

        var sorted = sort(elem, data);
        var nearest = topK(sorted, k);
        var maxClass = classCount(nearest);
        var classified = classify(maxClass);

        return classified;
    }

    return {
    	kNearestNeighbours: kNN
    };
});