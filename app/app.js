//
// Name:    app.js
// Purpose: The main app
// Creator: Tom Söderlund
//

'use strict';

var web = require('./web');
var commandline = require('./commandline');

// Main loop
if (process.argv.length >= 3) {
	// Run as command line
	commandline.runFromCommandLine();
}
else {
	// Else web server
	web.startWebServer();
};