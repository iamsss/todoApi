const {MongoClient, ObjectID } = require('mongodb'); 


MongoClient.connect('mongodb://localhost:27017/Todos',(err,db) => {
    if(err) {
      return  console.log('Unable to connect to MongoDB Server')
    }

    console.log('connected to mongoDb server9*/');



db.collection('Todos').findOneAndUpdate({text: "This is Saurav"}, 
{ $set: {
    completed: false
    }
},
{
    returnOriginal: false
}

).then((result) => {
console.log(result);
});

});