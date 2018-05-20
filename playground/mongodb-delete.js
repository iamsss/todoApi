const {MongoClient, ObjectID } = require('mongodb'); 


MongoClient.connect('mongodb://localhost:27017/Todos',(err,db) => {
    if(err) {
      return  console.log('Unable to connect to MongoDB Server')
    }

    console.log('connected to mongoDb server9*/');

   // delete many 

//    db.collection('Todos').deleteMany({text: "Hi"}).then((result)=> {
//        console.log(result)
//    });

// delete One
// db.collection('Todos').deleteOne({completed: false}).then((result)=> {
//     console.log(result)
// });

//Find One And Delete

db.collection('Todos').findOneAndDelete({completed: false}).then((result)=> {
        console.log(result)
    });

});