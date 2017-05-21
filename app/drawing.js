//
// Name:    drawing.js
// Purpose: ...
// Creator: Tom Söderlund
//

'use strict';

var _ = require('lodash');
var gm = require('gm');

// Private functions

// E.g. http://localhost:3030/drawLine:0,0,50,250/drawLine:0,0,250,250
var parseDrawingInstructions = function (drawingInstructions, imageOptions) {

	const parseCommands = function (cmdArray) {
		return _.map(cmdArray, function (cmdString) {
			cmdString = cmdString.replace(':', ',');
			var argumentArray = cmdString.split(',');
			var command = argumentArray.shift();
			return { command: command, arguments: argumentArray }
		});
	}

	const drawCommandArray = drawingInstructions.split('/');
	var drawArray = parseCommands(drawCommandArray);

	return drawArray;
};

// gm: see https://github.com/aheckmann/gm
var drawImageObject = function (drawingInstructions, imageOptions, callback) {
	var drawArray = parseDrawingInstructions(drawingInstructions);
	var imageObj = gm(imageOptions.width, imageOptions.height, imageOptions.backgroundColor);
	// Do all the drawing
	for (var i = 0; i < drawArray.length; i++) {
		try {
			console.log(i, drawArray[i]);
			imageObj[drawArray[i].command].apply(imageObj, drawArray[i].arguments);
		}
		catch (drawErr) {
			console.error(drawErr);
		}
	}
	imageObj.toBuffer(imageOptions.imageFormat.toUpperCase(), callback);
};

// Public API
module.exports = {

	drawImageObject: drawImageObject,

};