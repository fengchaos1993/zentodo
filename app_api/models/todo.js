var mongosoose = require('mongoose');

var todoSchema = new mongosoose.Schema({
    payload: { type: String, required: true },
    creationTime: { type: Date, required: true },
    startTime: { type: Date, required: true },
    dueTime: Number,
    finished: { type: Boolean, "default": false },
    priority: { type: Number, "default": 0 , min: 0, max: 5 },
    note: String
});

var userSchema = new mongosoose.Schema({
    username: {type: String, required: true },
    token: { type: String },
    displayPicture: Buffer,
    todos: [todoSchema]
});

mongosoose.model('User', userSchema, 'users');