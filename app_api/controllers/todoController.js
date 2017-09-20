var mongoose = require('mongoose');
var UserSchema = mongoose.model('User');

var sendJsonResponse = function (res, status, jsonContent) {
    res.status(status);
    res.json(jsonContent);
};

module.exports.getUserTodoList = function (req, res) {
    console.log('Getting user ' + req.params.userId + ' todo list...');
    if (req.params && req.params.userId) {
        UserSchema
            .findById(req.params.userId)
            .select('todos')
            .exec(function (err, userTodos) {
                if (!userTodos) {
                    sendJsonResponse(res, 404, {
                        'message': 'No Such User!'
                    });
                    return;
                } else if (err) {
                    console.log(err);
                    sendJsonResponse(res, 404, err);
                    return;
                }
                console.log(userTodos);
                sendJsonResponse(res, 200, userTodos);
            });
    } else {
        var msg = 'Missing Required Paramters!';
        console.log(msg, req);
        sendJsonResponse(res, 400, {
            message: msg
        });
    }
};

module.exports.getUserTodoItem = function (req, res) {
    if (req.params && req.params.userId && req.params.todoId) {
        console.log('Getting user ' + req.params.userId + ' todo item ' + req.params.todoId);
        UserSchema
            .findById(userId)
            .select('todos')
            .exec(function (err, userTodos) {
                if (!userTodos) {
                    console.log('No such user!');
                    sendJsonResponse(res, 404, {
                        'message': 'No Such User!'
                    });
                    return;
                } else if (err) {
                    console.log(err);
                    sendJsonResponse(res, 404, err);
                    return;
                }
                if (userTodos.todos && userTodos.todos.length > 0) {
                    var todo = userTodos.todos.id(req.params.todoId);
                    if (!todo) {
                        console.log('No such Todo Item!');
                        sendJsonResponse(res, 404, {
                            'message': 'No such Todo Item!'
                        });
                        return;
                    } else {
                        console.log(todo);
                        sendJsonResponse(res, 200, {
                            'todo': todo
                        })
                    }
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

module.exports.createTodoItem = function (req, res) {
    if (req.params && req.params.userId && req.body) {
        UserSchema
            .findById(req.params.userId)
            .exec(function (err, user) {
                if (err) {
                    console.log(err);
                    sendJsonResponse(res, 500, err);
                    return;
                } else {
                    user.todos.push(req.body);
                    user.save(function (err, user) {
                        if (err) {
                            console.log(err);
                            sendJsonResponse(res, 500, err);
                            return;
                        } else {
                            var newTodo = user.todos[user.todos.length - 1];
                            console.log(newTodo);
                            sendJsonResponse(res, 201, newTodo);
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

module.exports.updateTodoItem = function (req, res) {
    if (req.params && req.params.userId && req.params.todoId) {
        UserSchema
            .findById(req.params.userId)
            .exec(function (err, user) {
                if (err) {
                    console.log(err);
                    sendJsonResponse(res, 500, err);
                    return;
                } else {
                    var todoItem = user.todos.id(req.params.todoId);
                    if (!todoItem) {
                        var msg = 'Todo Item NOT Found!';
                        console.log(msg, req);
                        sendJsonResponse(res, 404, {
                            message: msg
                        });
                        return;
                    } else {
                        if ("payload" in req.body) {
                            todoItem.payload = req.body.payload;
                        }
                        if ("creationTimestartTime" in req.body) {
                            todoItem.creationTimestartTime = req.body.creationTimestartTime;
                        }
                        if ("startTime" in req.body) {
                            todoItem.startTime = req.body.startTime;
                        }
                        if ("dueTime" in req.body) {
                            todoItem.dueTime = req.body.dueTime;
                        }
                        if ("finished" in req.body) {
                            todoItem.finished = req.body.finished;
                        }
                        if ("priority" in req.body) {
                            todoItem.priority = req.body.priority;
                        }
                        if ("note" in req.body) {
                            todoItem.note = req.body.note;
                        }
                        user.save(function (err, user) {
                            if (err) {
                                var msg = 'Failed to update user ' + req.params.userId + ' todo item ' + req.params.todoId;
                                console.log(msg, req);
                                sendJsonResponse(res, 500, {
                                    message: msg
                                });
                                return;
                            } else {
                                console.log(todoItem);
                                sendJsonResponse(res, 200, todoItem);
                                return;
                            }
                        });
                    }
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

module.exports.deleteTodoItem = function (req, res) {
    if (req.params && req.params.userId && req.params.todoId) {
        UserSchema
            .findById(req.params.userId)
            .select('todos')
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
                    user.todos.id(todoId).remove();
                    user.save(function (err, todoItem) {
                        if (err) {
                            var msg = 'Error occured while deleting the Todo item ' + req.params.todoId;
                            console.log(msg, req);
                            sendJsonResponse(res, 500, {
                                message: msg
                            });
                            return;
                        } else {
                            console.log(todoItem);
                            sendJsonResponse(res, 204, null);
                        }
                    });
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