//
// Name:    drawing.js
// Purpose: ...
// Creator: Tom Söderlund
//

'use strict';

var _ = require('lodash');
var gm = require('gm');

// Private functions

String.prototype.capitalize = String.prototype.capitalize || function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
};

// E.g. http://localhost:3030/drawLine:0,0,50,250/drawLine:0,0,250,250
var parseDrawingInstructions = function (drawingInstructions, imageOptions) {

	// 'line:0,0,50,250' -> { command, arguments }
	const parseCommands = function (stringArray) {
		return _.map(stringArray, function (cmdString) {
			cmdString = cmdString.replace(':', ',');
			var argumentArray = cmdString.split(',');
			var command = argumentArray.shift();
			return { command: command, arguments: argumentArray }
		});
	};

	// 'line' -> 'drawLine'
	const expandAbbreviations = function (cmdArray) {
		_.forEach(cmdArray, function (cmdObj) {
			const DRAW_COMMANDS = ['arc', 'bezier', 'circle', 'ellipse', 'line', 'point', 'polygon', 'polyline', 'rectangle', 'text'];
			if (_.includes(DRAW_COMMANDS, cmdObj.command)) {
				cmdObj.command = 'draw' + cmdObj.command.capitalize();
			}
		});
	};

	// Check size, background commands etc
	const processImageOptions = function (cmdArray, imgOptions) {
		_.forEach(cmdArray, function (cmdObj) {
			switch (cmdObj.command) {
				case 'format':
					imgOptions.imageFormat = cmdObj.arguments[0];
					break;
				case 'size':
					imgOptions.width = cmdObj.arguments[0];
					imgOptions.height = cmdObj.arguments[1];
					break;
				case 'width':
					imgOptions.width = cmdObj.arguments[0];
					break;
				case 'height':
					imgOptions.height = cmdObj.arguments[0];
					break;
				case 'background':
					imgOptions.backgroundColor = cmdObj.arguments[0];
					break;
			}
		});
	};

	// E.g. background:*ddaadd because of # being reserved in URLs
	const drawingInstructionsMod = drawingInstructions.replace(/\*/g, '#');
	const drawStringArray = drawingInstructionsMod.split('/');
	var drawCommandArray = parseCommands(drawStringArray);
	expandAbbreviations(drawCommandArray);
	processImageOptions(drawCommandArray, imageOptions);

	return drawCommandArray;
};

// gm: see https://github.com/aheckmann/gm
var drawImageObject = function (drawingInstructions, imageOptions, callback) {
	var drawArray = parseDrawingInstructions(drawingInstructions, imageOptions);
	console.log('imageOptions', imageOptions);
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