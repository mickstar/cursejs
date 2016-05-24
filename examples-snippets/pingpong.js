'use strict';

var util = require('util');

var Client = require('../lib/index.js').Client;
var app = new Client;

//This is a very basic command handling
app.on('message_received', function(message){
    message.conversation.sendMessage("pong!");
});

app.run("LOGIN", "PASSWORD");
