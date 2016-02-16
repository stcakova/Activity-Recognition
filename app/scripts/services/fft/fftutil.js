'use strict';

angular.module('activityRecognition').service('FftUtil', function(Complex) {
/*===========================================================================*\
   * Fast Fourier Transform Frequency/Magnitude passes
   *
   * (c) Vail Systems. Joshua Jung and Ben Bryan. 2015
   *
   * This code is not designed to be highly optimized but as an educational
   * tool to understand the Fast Fourier Transform.
  \*===========================================================================*/

  //-------------------------------------------------
  // The following code assumes a Complex number is
  // an array: [real, imaginary]
  //-------------------------------------------------
  //var Complex = require('./Complex');


  //-------------------------------------------------
  // By Eulers Formula:
  //
  // e^(i*x) = cos(x) + i*sin(x)
  //
  // and in DFT:
  //
  // x = -2*PI*(k/N)
  //-------------------------------------------------
  var mapExponent = {},
      exponent = function (k, N) {
        var x = -2 * Math.PI * (k / N);

        mapExponent[N] = mapExponent[N] || {};
        mapExponent[N][k] = mapExponent[N][k] || [Math.cos(x), Math.sin(x)];// [Real, Imaginary]

        return mapExponent[N][k];
  };

  //-------------------------------------------------
  // Calculate FFT Magnitude for Complex numbers.
  //-------------------------------------------------
  var fftMag = function (fftBins) {
      var ret = fftBins.map(Complex.magnitude);
      return ret.slice(0, ret.length / 2);
  };

  //-------------------------------------------------
  // Calculate Frequency Bins
  // 
  // Returns an array of the frequencies (in hertz) of
  // each FFT bin provided, assuming the sampleRate is
  // samples taken per second.
  //-------------------------------------------------
  var fftFreq = function (fftBins, sampleRate) {
      var stepFreq = sampleRate / (fftBins.length);
      var ret = fftBins.slice(0, fftBins.length / 2);

      return ret.map(function (__, ix) {
          return ix * stepFreq;
      });
  };

  var fftAmpl = function(fftBins, treshold, sampleRate) {
    var n = fftBins.length;
    var len = Math.floor(fftBins.length /2);
    var stepFreq = sampleRate / (fftBins.length);
    var result = [];
    var tmp = [];
    var af,f;
    for (var i = 0; i < len; i++) {
      if (Complex.magnitude(fftBins[i]) > treshold ) {
         af = 2/Math.sqrt(n)*Complex.magnitude(fftBins[i]);
         f = stepFreq * i;
         tmp.push(af);
         tmp.push(f);
         result.push(tmp);
         tmp = [];
      };
    };
    return result.sort(function(a,b){
    	return b[0] - a[0];
		});
  };

  //-------------------------------------------------
  // Exports
  //-------------------------------------------------
  return {
      fftMag: fftMag,
      fftFreq: fftFreq,
      exponent: exponent,
      fftAmpl: fftAmpl
  };
});