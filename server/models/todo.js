var mongoose = require('mongoose');

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


module.exports = {
    Todo
};