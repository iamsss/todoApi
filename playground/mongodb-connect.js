// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID } = require('mongodb'); // 2 and 1 are same for mongoClient


// Connecting to Database
// MongoClient.connect('mongodb://localhost:27017/Todos',(err,db) => {
//     if(err) {
//       return  console.log('Unable to connect to MongoDB Server')
//     }

//     console.log('connected to mongoDb server9*/');

//     // Add to DataBase
//     db.collection('Todos').insertOne({
//       text: 'Something to do',
//       completed: false  
//     },(err, result) => {
//         if(err) {
//             return console.log('There is some error');

//         }
//         console.log('There is some error');
    
//         //to output the result
//         console.log(JSON.stringify(result.ops))
//     })

//     db.close();


// });


MongoClient.connect('mongodb://localhost:27017/Todos',(err,db) => {
    if(err) {
      return  console.log('Unable to connect to MongoDB Server')
    }

    console.log('connected to mongoDb server9*/');

    // Add to DataBase
    db.collection('Users').insertOne({
      name: 'Saurav',
      age: 20,
      location: 'Banka' 
    },(err, result) => {
        if(err) {
            return console.log('There is some error');

        }
        console.log('There is some error');
    
        //to output the result
        console.log(JSON.stringify(result.ops))
    })

    db.close();


});