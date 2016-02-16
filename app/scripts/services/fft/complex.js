'use strict';

angular.module('activityRecognition').service('Complex', function() {//-------------------------------------------------
	// Add two complex numbers
	//-------------------------------------------------
	var complexAdd = function (a, b)
	{
	    return [a[0] + b[0], a[1] + b[1]];
	};

	//-------------------------------------------------
	// Subtract two complex numbers
	//-------------------------------------------------
	var complexSubtract = function (a, b)
	{
	    return [a[0] - b[0], a[1] - b[1]];
	};

	//-------------------------------------------------
	// Multiply two complex numbers
	//
	// (a + bi) * (c + di) = (ac - bd) + (ad + bc)i
	//-------------------------------------------------
	var complexMultiply = function (a, b) 
	{
	    return [(a[0] * b[0] - a[1] * b[1]), 
	            (a[0] * b[1] + a[1] * b[0])];
	};

	//-------------------------------------------------
	// Calculate |a + bi|
	//
	// sqrt(a*a + b*b)
	//-------------------------------------------------
	var complexMagnitude = function (c) 
	{
	    return Math.sqrt(c[0]*c[0] + c[1]*c[1]); 
	};

	//-------------------------------------------------
	// Exports
	//-------------------------------------------------
	return {
	    add: complexAdd,
	    subtract: complexSubtract,
	    multiply: complexMultiply,
	    magnitude: complexMagnitude
	};
});