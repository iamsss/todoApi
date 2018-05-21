var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/Todos');

var Todo = mongoose.model('Todo', {
    text: {
        type: String,
        required: true,
        minlength: 1,
        trim: true // for triming starting and ending white space
    },
    completed:{
        type: Boolean,
        default: false
    },
    completedAt: {
        type: Number,
        default: null
    }
});

// var newTodo = new Todo({
//     text: 'Cook dinner'
// });

// newTodo.save().then((doc)=> {
//     console.log('Save Todo',doc);
// },(e)=>{
//     console.log('Unable to save data')
// }) // for saving data

// var otherTodo = new Todo({
//     text: 'Hey Savurav   '
// });

// otherTodo.save().then((doc)=> {
//     console.log('Save Todo',doc);
// },(e)=>{
//     console.log('Unable to save data')
// }) // for saving data

var User = mongoose.model('User', {
    email: {
        type: String,
        required: true,
        minlength: 1,
        trim: true // for triming starting and ending white space
    }
});

var user1 = new User({
    email: 'saurav9760@gmail.com'
});

user1.save().then((doc)=> {
    console.log('Save User',doc);
},(e)=>{
    console.log('Unable to save data')
}) // for saving data
