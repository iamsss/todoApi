var express = require('express');
var bodyParser = require('body-parser');


var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
const {ObjectID} = require('mongodb');

const port = process.env.PORT || 3000;

var app = express();

app.use(bodyParser.json());

app.post('/todos',(req,res) => {
   var todo = new Todo({
       text : req.body.text
   })
   todo.save().then((doc) => {
       res.send(doc);
        console.log('Document : ',doc)
   },(e) => {
       res.status(400).send(e);
        console.log('unable to save the data');
   });
})




app.get('/todos',(req,res) => {
    Todo.find().then((todos) => {
        res.send({todos});

    },(e) => {
        console.log('There is Error');
        res.status(400).send(e);
    });
});

app.get('/todos/:id',(req,res) => {
    var id = req.params.id;
    if(!ObjectID.isValid(id)){
        return res.status(400).send('ID Not Valid');
    }
    Todo.findById(id).then((todo) =>{
        if(!todo){
            return res.status(404).send('Todo Not found for this id');
        }
        res.send(todo);
    }).catch((e) => {
        res.send('There is some Error', e);
    })
});

app.listen(port, () => {
    console.log(`Started at por ${port}`)
});



module.exports = {app};