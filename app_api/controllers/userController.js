var mongoose = require('mongoose');
var UserSchema = mongoose.model('User');

var sendJsonResponse = function (res, status, jsonContent) {
    res.status(status);
    res.json(jsonContent);
};

/* GET User List */
module.exports.getUserList = function (req, res) {
    console.log('Getting full user list...', req.params);
    UserSchema
        .find()
        .select("username displayPicture token")
        .exec(function (err, userList) {
            if (!userList) {
                var msg = 'No User Found';
                console.log(msg, req);
                sendJsonResponse(res, 404, {
                    message: msg
                })
                return;
            } else if (err) {
                console.log(err, req);
                sendJsonResponse(res, 404, err);
                return;
            } else {
                console.log(userList);
                sendJsonResponse(res, 200, userList);
            }
        });
}

/* GET User by the Id */
module.exports.getUserById = function (req, res) {
    console.log('Finding user details...', req.params);
    if (req.params && req.params.userId) {
        UserSchema
            .findById(req.params.userId)
            .exec(function (err, user) {
                if (!user) {
                    var msg = 'User Not Found';
                    console.log(msg, req);
                    sendJsonResponse(res, 404, {
                        message: msg
                    })
                    return;
                } else if (err) {
                    console.log(err, req);
                    sendJsonResponse(res, 404, err);
                    return;
                } else {
                    console.log(user);
                    sendJsonResponse(res, 200, user);
                }
            });
    } else {
        var msg = 'Missing Required Paramters!';
        console.log(msg, req);
        sendJsonResponse(res, 400, {
            message: msg
        });
    }
};

/* CREATE a new User */
module.exports.createUser = function (req, res) {
    console.log('Creatinga new user...');
    if (req.body) {
        UserSchema
            .create({
                username: req.body.username,
                token: req.body.token,
                displayPicture: req.body.displayPicture,
                todos: []
            }, function (err, user) {
                if (err) {
                    console.log(err, req);
                    sendJsonResponse(res, 500, err);
                    return;
                } else {
                    console.log(user);
                    sendJsonResponse(res, 201, user);
                    return;
                }
            });
    } else {
        var msg = 'Missing Required Paramters!';
        console.log(msg, req);
        sendJsonResponse(res, 400, {
            message: msg
        });
    }
};

/* UPDATE an existing user's metadata */
module.exports.updateUserMetadata = function (req, res) {
    if (req.params && req.params.userId) {
        console.log("Updating User " + req.params.userId + " metadata...");
        UserSchema
            .findById(req.params.userId)
            .select('-todos')
            .exec(function (err, user) {
                if (err) {
                    var msg = 'Error occured while finding the user!';
                    console.log(msg, req);
                    sendJsonResponse(res, 500, {
                        message: msg
                    });
                    return;
                } else if (!user) {
                    var msg = 'No Such User!';
                    console.log(msg, req);
                    sendJsonResponse(res, 404, {
                        message: msg
                    });
                    return;
                } else {
                    console.log('updating user ' + userId, req.body);
                    if (req.body.token) {
                        console.log('change ' + user.token + ' to ' + req.body.token);
                        user.token = req.body.token;
                    }
                    if (req.body.displayPicture) {
                        console.log('change ' + user.displayPicture + ' to ' + req.body.displayPicture);
                        user.displayPicture = req.body.displayPicture;
                    }
                    if (req.body.username) {
                        console.log('change ' + user.username + ' to ' + req.body.username);
                        user.username = req.body.username;
                    }
                    user.save(function (err, userNew) {
                        if (err) {
                            var msg = 'Failed to update user ' + req.params.userId;
                            console.log(msg, req);
                            sendJsonResponse(res, 500, {
                                message: msg
                            });
                            return;
                        } else {
                            console.log(userNew);
                            sendJsonResponse(res, 200, userNew);
                            return;
                        }
                    });
                }
            });
    } else {
        var msg = 'Missing Required Paramters!';
        console.log(msg, req);
        sendJsonResponse(res, 400, {
            message: msg
        });
    }
};

/* DELETE an exisitng user */
module.exports.deleteUserById = function (req, res) {
    if (req.params && req.params.userId) {
        console.log('Deleting user ' + req.params.userId);
        UserSchema
            .findByIdAndRemove(req.params.userId)
            .exec(function (err, user) {
                if (err) {
                    console.log('Failed to delete user ' + req.params.userId);
                    sendJsonResponse(res, 500, {
                        message: 'Failed to delete user ' + req.params.userId
                    });
                    return;
                } else {
                    console.log('Deleted user ' + req.params.userId, user);
                    sendJsonResponse(res, 204, null);
                    return;
                }
            })
    } else {
        var msg = 'Missing Required Paramters!';
        console.log(msg, req);
        sendJsonResponse(res, 400, {
            message: msg
        });
    }
};