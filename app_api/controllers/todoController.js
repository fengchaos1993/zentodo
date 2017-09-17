var mongoose = require('mongoose');
var UserSchema = mongoose.model('User');

var sendJsonResponse = function (res, status, jsonContent) {
    res.status(status);
    res.json(jsonContent);
};

module.exports.getUserTodoList = function (req, res) {
    console.log('Getting user ' + req.params.userId + ' todo list...');
    if (req.params && req.params.userId){
        UserSchema
            .findById(req.params.userId)
            .select('todos')
            .exec(function (err, userTodos) {
                if (!userTodos){
                    sendJsonResponse(res, 404, {
                        'message': 'No Such User!'
                    });
                    return;
                } else if (err){
                    console.log(err);
                    sendJsonResponse(res, 404, err);
                    return;
                }
                console.log(userTodos);
                sendJsonResponse(res, 200, userTodos);
            });
    } else {
        console.log('Missing UserId');
        sendJsonResponse(res, 400, {
            'message': 'Missing UserId'
        });
    }
};

module.exports.getUserTodoItem = function (req, res){
    if(req.params && req.params.userId && req.params.todoId){
        console.log('Getting user '+ req.params.userId + ' todo item '+ req.params.todoId);
        UserSchema
        .findById(userId)
        .select('todos')
        .exec(function(err, userTodos){
            if(!userTodos){
                console.log('No such user!');
                sendJsonResponse(res, 404, {
                    'message': 'No Such User!'
                });
                return;
            } else if(err){
                console.log(err);
                sendJsonResponse(res, 404, err);
                return;
            }
            if(userTodos.todos && userTodos.todos.length > 0){
                var todo = userTodos.todos.id(req.params.todoId);
                if(!todo){
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
        console.log('Missing Necessary Parameters');
        sendJsonResponse(res, 400, {
            'message': 'Missing Necessary Parameters'
        }); 
    }
};

module.exports.createTodoItem = function (req, res) {};

module.exports.updateTodoItem = function (req, res) {};

module.exports.deleteTodoItem = function (req, res) {};
