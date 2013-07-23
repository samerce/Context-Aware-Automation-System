var serverPort = 1337;


var express = require('express'),
    hueWrapper = require('./hueWrapper'),
    logger = require('./logger'),
    triggerDecider = require('./triggerDecider'),
    actionRunner = require('./actionRunner');

var app = express();
app.get('/', function(req, res) {
    var message = "Success!"
	res.send(message);

//    triggerDecider.handleRawInput({sensor:"C2"});
    triggerDecider.handleRawInput(req.query);
});

hueWrapper.init();
triggerDecider.init();
actionRunner.init();
app.listen(serverPort);

logger.i('Server running!');
