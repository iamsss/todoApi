

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
const {ObjectID} = require('mongodb');

// remove All
Todo.remove({}).then((result) => {
    console.log(result);
});

//todo FindOne And Remove
Todo.findOneAndRemove({_id: ''}).then((doc) => {
    console.log('Doc : ', doc);
});


// ToDO FindBy Id and Delete
Todo.findByIdAndRemove('').then((doc) => {
    console.log('Doc : ', doc);
});


