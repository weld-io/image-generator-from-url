//
// Name:    drawing.js
// Purpose: ...
// Creator: Tom Söderlund
//

'use strict';

var gm = require('gm');

// Private functions

// gm: see https://github.com/aheckmann/gm
var drawImageObject = function (imageData, imageOptions, callback) {
	var imageObj = gm(imageOptions.width, imageOptions.height, "#ccaabb");
	imageObj.stroke("#000").drawText(10, 50, "from scratch").drawLine(0, 0, 250, 250);
	imageObj.toBuffer(imageOptions.imageFormat.toUpperCase(), callback);
};

// Public API
module.exports = {

	drawImageObject: drawImageObject,

};