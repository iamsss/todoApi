var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
var path = 'mongodb://saurav9760:sfb604#Saurav@ds231460.mlab.com:31460/todoapi';
try
{
    mongoose.connect(path);
}
catch(e)
{
    console.log("Failed to connect to database",e);
}

module.exports = {
    mongoose
};