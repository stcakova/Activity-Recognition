'use strict';

angular.module('activityRecognition').service('Dft', function(Complex, FftUtil) {/*===========================================================================*\
   * Discrete Fourier Transform (O(n^2) brute-force method)
   *
   * (c) Vail Systems. Joshua Jung and Ben Bryan. 2015
   *
   * This code is not designed to be highly optimized but as an educational
   * tool to understand the Fast Fourier Transform.
  \*===========================================================================*/

  //------------------------------------------------
  // Note: this code is not optimized and is
  // primarily designed as an educational and testing
  // tool.
  //------------------------------------------------
  //var Complex = require('./Complex');
  //var FftUtil = require('./fftutil');

  //-------------------------------------------------
  // Calculate brute-force O(n^2) DFT for vector.
  //-------------------------------------------------
  var dft = function(vector) {
    var X = [],
        N = vector.length;

    for (var k = 0; k < N; k++) {
      X[k] = [0, 0]; //Initialize to a 0-valued Complex number.

      for (var i = 0; i < N; i++) {
        var exp = FftUtil.exponent(k * i, N);
        var term = Complex.multiply([vector[i], 0], exp); //Complex mult of the signal with the exponential term.
        X[k] = Complex.add(X[k], term); //Complex summation of X[k] and exponential
      }
    }

    return X;
  };

  return { dft: dft };

});