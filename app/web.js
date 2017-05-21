//
// Name:    web.js
// Purpose: Web URL input/output
// Creator: Tom Söderlund
//

'use strict';

var _ = require('lodash');
var http = require('http');
var url = require('url');

var config = require('./config');
var drawing = require('./drawing');

// Private functions

// Start server
var startWebServer = function () {
	var serverPort = process.env.PORT || 3030;
	var server = http.createServer(onIncomingHTTPRequest);

	server.listen(serverPort, function () {
		console.log('image-generator-from-url running on http://localhost:' + serverPort);
	});
};

// Process the incoming request if not already processing
// Else put into queue
var onIncomingHTTPRequest = function (req, res) {
	console.log('Incoming request:', req.url);
		processHTTPRequest(req, res); // Process immediately
	// // if (requestsBeingProcessed < MAX_PARALLELL_JOBS) {
	// 	processHTTPRequest(req, res); // Process immediately
	// }
	// else {
	// 	addToRequestQueue(req, res); // Add to queue
	// }
};

var parseUrlParameters = function (urlObj) {
	var drawingInstructions = urlObj.slice(1);
	if (drawingInstructions === 'favicon.ico')
		return null;
	var imageOptions = _.merge({}, config.defaultOptions);
	_.merge(imageOptions, url.parse(urlObj, true).query);
	return {
		drawingInstructions: drawingInstructions,
		imageOptions: imageOptions,
	};
};

// Take a request object and work on it
var processHTTPRequest = function (req, res, callback) {
	var params = parseUrlParameters(req.url);

	if (params === null) {
		// No URL
		sendWebResponse(res, undefined, callback, 'Not valid URL', undefined);
	}
	else {
		// requestsBeingProcessed++;
		// console.log('Working on: %s (total %d)', params.drawingInstructions, requestsBeingProcessed);
		drawing.drawImageObject(params.drawingInstructions, params.imageOptions, sendWebResponse.bind(this, res, params.imageOptions, callback));
	}

};

var sendWebResponse = function (res, imageOptions, callback, err, imageBuffer) {
	// requestsBeingProcessed--;
	// console.log('Done with: %s (total %d)', 'X', requestsBeingProcessed);
	if (!err) {
		res.writeHead(200, {
			'Content-Type': 'image/' + imageOptions.imageFormat,
			'Content-Length': imageBuffer.length,
			'Cache-Control': 'public, max-age=31536000'});
		res.end(imageBuffer);
	}
	else {
		console.log('Image render error:', err);
		if (res.send)
			res.send(500);
		else
			res.end();
	}
	if (callback) callback(err);
};

// Public API
module.exports = {

	startWebServer: startWebServer,

};
