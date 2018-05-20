const {MongoClient, ObjectID } = require('mongodb'); 


MongoClient.connect('mongodb://localhost:27017/Todos',(err,db) => {
    if(err) {
      return  console.log('Unable to connect to MongoDB Server')
    }

    console.log('connected to mongoDb server9*/');

    // db.collection('Todos').find({_id:ObjectID("5b019ac506d3931ef4a35269")}).toArray().then((docs) => {
    //     console.log(JSON.stringify(docs,undefined,2));
    // }, (err) => {
    //     console.log('Error',err);
    // });

    db.collection('Todos').find().count().then((count) => {
        console.log(`Total Count ${count}`);
    }, (err) => {
        console.log('Error',err);
    });
});