'use-strict';

var req = require('../utils/requests.js');
var winston = require('winston');

var host = 'accounts-v1.curseapp.net';

statuses = {
    "online" : 1,
    "away" : 2,
    "offline" : 3,
    "busy" : 5
};

function setStatus (token, status, machineKey, callback){
    if (typeof status === "string"){
        status = statuses[status];
        if (status === "undefined"){
            throw("error, status does not exist.")
        }
    }
    var payload = {
        MachineKey : machineKey,
        CustomStatusMessage : "",
        Status : status
    }
    req.post( {host: host, endpoint: '/account/status/connection', token: token}, payload, function(errors, answer){
        if(errors === null){
            callback(null, answer.content);
        }
        else{
            winston.log('debug', 'account.status', "error setting status ", errors);
            callback(errors, undefined);
        }
    });
}

exports.setStatus = setStatus;
