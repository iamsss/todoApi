var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://saurav9760:sfb604#Saurav@ds231460.mlab.com:31460/todoapi');

module.exports = {
    mongoose
};