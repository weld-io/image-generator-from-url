//
// Name:    workqueue.js
// Purpose: ...
// Creator: Tom Söderlund
//

'use strict';

// Private functions

var MAX_PARALLELL_JOBS = (process.env['MAX_PARALLELL_JOBS'] ? parseInt(process.env['MAX_PARALLELL_JOBS']) : 3);
var requestsBeingProcessed = 0;
var requestQueue = [];
var workingOnQueue = false;

// Take a request object and work on it
var addToRequestQueue = function (req, res) {
	requestQueue.push({ req: req, res: res });
	// Start working on queue if not doing it already
	if (!workingOnQueue) {
		workingOnQueue = true;
		// While: 1) there is spare capacity, and 2) there is work in the queue
		async.whilst(
			function () { return requestsBeingProcessed < MAX_PARALLELL_JOBS && requestQueue.length > 0; },
			function (callback) {
				console.log('Working on: %d, in queue: %d', requestsBeingProcessed, requestQueue.length);
				var firstRequest = requestQueue.shift();
				processHTTPRequest(firstRequest.req, firstRequest.res);
				callback(null);
			},
			function (err, results) {
				console.log('Done. Working on: %d, in queue: %d', requestsBeingProcessed, requestQueue.length);
				workingOnQueue = false;
			}
		);		
	}
};

// Public API
module.exports = {

	defaultOptions: {
		width: 500,
		height: 500,
		imageFormat: 'png',
	},

};