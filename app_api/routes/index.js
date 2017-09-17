var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController');
var todoController = require('../controllers/todoController');

// users
router.get('/users', userController.getUserList);
router.get('/users/:userId', userController.getUserById);
router.post('/users', userController.createUser);
router.put('/users/:userId', userController.updateUserMetadata);
router.delete('/users/:userId', userController.deleteUserById);

// todos
router.get('/users/:userId/todos', todoController.getUserTodoList);
router.post('/users/:userId/todos', todoController.createTodoItem);
router.get('/users/:userId/todos/:todoId', todoController.getUserTodoItem);
router.put('/users/:userId/todos/:todoId', todoController.updateTodoItem);
router.delete('/users/:userId/todos/:todoId', todoController.deleteTodoItem);

module.exports = router;