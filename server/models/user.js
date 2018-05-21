var mongoose = require('mongoose');
var User = mongoose.model('User', {
    email: {
        type: String,
        required: true,
        minlength: 1,
        trim: true // for triming starting and ending white space
    }
});
 
module.exports = {
    User
};