var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
process.env.MONGODB_URI = 'mongodb://saurav9760:sfb604#Saurav@ds231460.mlab.com:31460/todoapi';
try
{
    mongoose.connect(process.env.MONGODB_URI || 3000, function (err) {
        // Log Error
        if (err) {
        console.error(chalk.red('Could not connect to MongoDB!'));
        console.log(err);
        } else {
        
        }
        });
}
catch(e)
{
    console.log("Failed to connect to database",e);
}

module.exports = {
    mongoose
};