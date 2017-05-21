//
// Name:    commandline.js
// Purpose: ...
// Creator: Tom Söderlund
//

'use strict';

var processCommandLine = function () {
	var imageOptions = _.merge({}, config.defaultOptions);
	async.waterfall([
			// Process arguments
			function (cbWaterfall) {
				for (var i = 2; i < process.argv.length; i++) {
					var arg = process.argv[i];
					if (arg.indexOf('http') !== -1) {
						imageOptions.url = arg;
					}
					else if (arg.indexOf('=') !== -1) {
						var param = arg.split('=');
						imageOptions[param[0]] = param[1];
					}
					else if (arg.indexOf('.') !== -1) {
						imageOptions.fileName = arg;
					}
				};
				imageOptions.fileName = imageOptions.fileName || 'screenshot.' + imageOptions.imageFormat;
				cbWaterfall(null, imageOptions);
			},
			// Render page
			function (imageOptions, cbWaterfall) {
				console.log('Render URL to image', imageOptions);
				renderUrlToImage(imageOptions.url, imageOptions, cbWaterfall);
			},
			// Save to disk
			function (imageBuffer, cbWaterfall) {
				saveImageBufferToDisk(imageOptions.fileName, imageBuffer, cbWaterfall);
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

};