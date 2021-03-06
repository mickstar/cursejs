'use strict';

const assert = require('assert');
var winston = require('winston');

var contactsEndpoints = require('../endpoints/contacts-v1.js');

/**
 * @class User
 * @description User is the parent class of all Curse users we'll find here
 * @property    {Client}    client      [Client]{@link Client} object used to create this [User]{@link User} instance.
 * @property    {number}    ID          Curse ID of the current user.
 */
class User {
    constructor(userid, client){
        //We need the user to not exist already
        assert(client.users.has(userid) == false);
        client.users.set(userid, this);

        this.client = client;
        this.ID = userid;

        this._username = undefined;

    }

    /**
     * @description Get the name of the curse account for this user (asynchronously).
     * @param  {Function} callback  Callback: (errors, username) => {}.
     * * **errors** is null or undefined when function ends correctly.
     * * **username** is a **string** for the curse username of this [User]{@link User}.
     */
    username(callback){
        var self = this;
        if(this._username == undefined){
            contactsEndpoints.user(this.ID, this.client.token, function(errors, data){
                if(errors == null){
                    self._username = data.content['Username'];
                    callback(null, self._username);
                }
                else {
                    winston.log('error', 'User.username', 'Cannot get username');
                    winston.log('debug', 'User.username', errors);
                    callback(errors, undefined);
                }
            });
        } else {
            callback(null, this._username);
        }
    }
}

exports.User = User;
