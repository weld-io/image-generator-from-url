//
// Name:    commandline.js
// Purpose: ...
// Creator: Tom Söderlund
//

'use strict';

var _ = require('lodash');
var async = require('async');
var fs = require('fs');

var config = require('./config');
var drawing = require('./drawing');

var params;

var parseCommandLineArguments = function (callback) {
	// Default parameters
	params = { imageOptions: {} };
	_.merge(params.imageOptions, config.defaultOptions);
	params.fileName = 'image.' + params.imageOptions.imageFormat;
	// fileName
	if (process.argv.length > 3) {
		params.fileName = process.argv[3];
	}
	// drawingInstructions
	if (process.argv.length > 2) {
		params.drawingInstructions = process.argv[2];
	}
	callback(null, params);
};

var runFromCommandLine = function () {
	async.waterfall(
		[
			// Process arguments
			parseCommandLineArguments,
			// Render page
			function (params, cbWaterfall) {
				console.log('Render URL to image', params);
				drawing.drawImageObject(params.drawingInstructions, params.imageOptions, cbWaterfall);
			},
			// Save to disk
			function (imageBuffer, cbWaterfall) {
				saveImageBufferToDisk(params.fileName, imageBuffer, cbWaterfall);
			},
		]
	);
};

// Save image to disk
var saveImageBufferToDisk = function (fileName, imageBuffer, callback) {
	console.log('Saving to disk:', fileName);
	fs.writeFile(fileName, imageBuffer, 'binary', callback);
};

// Public API
module.exports = {

	runFromCommandLine: runFromCommandLine,

};