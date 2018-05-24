require('./config/config');
const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');


const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');
const {ObjectID} = require('mongodb');
const {authenticate} = require('./middleware/authenticate');
const {bcrypt} = require('bcryptjs');

const port = process.env.PORT || 3000;

var app = express();

app.use(bodyParser.json());

app.post('/todos',authenticate,(req,res) => {
   var todo = new Todo({
       text : req.body.text,
       _creator: req.user._id
   });
   todo.save().then((doc) => {
       res.send(doc);
      //  console.log('Document : ',doc)
   },(e) => {
       res.status(400).send(e);
       // console.log('unable to save the data');
   });
})





app.get('/todos',authenticate,(req,res) => {
    Todo.find({
        _creator: req.user._id
    }).then((todos) => {
        res.send({todos});

    },(e) => {
        console.log('There is Error');
        res.status(400).send(e);
    });
});

app.get('/todos/:id',authenticate,(req,res) => {
    var id = req.params.id;
    if(!ObjectID.isValid(id)){
        return res.status(400).send('ID Not Valid');
    }
    Todo.findOne({
        _id: id,
        _creator: req.user._id
    }).then((todo) =>{
        if(!todo){
            return res.status(404).send('Todo Not found for this id');
        }
        res.send(todo);
    }).catch((e) => {
        res.status(404).send();
    })
});

app.patch('/todos/:id',authenticate,(req,res) => {
    var id = req.params.id;
    var body = _.pick(req.body,['text','completed']);

    if(!ObjectID.isValid(id)){
        return res.status(400).send('ID Not Valid');
    }

    if(_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();        
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findOneAndUpdate({
        _id: id,
        _creator: req.user._id
    },{$set: body},{ new: true})
    .then((todo) => {
        if(!todo){
            return res.status(404).send();
        }
        res.send({todo});
    }).catch((e) => {
        res.status(400).send()
    });

});

app.delete('/todos/:id',authenticate, (req,res) => {
    var id = req.params.id;
    if(!ObjectID.isValid(id)){
        return res.status(400).send('ID Not Valid');
    }

    Todo.findOneAndRemove({
        _id: id,
        _creator: req.user._id
    }).then((todo) => {
        
        if(!todo){
            return res.status(404).send('Todo Not found for this id');
        }
        res.send(todo);
    }).catch((e) => {
        res.send('There is some Error', e);
    });
});



app.post('/users',(req,res) => {
    var body = _.pick(req.body,['email','password']);
    var user = new User(body);
    user.save().then(() => {
        return user.generateAuthToken();
    }).then((token) => {
        res.header('x-auth', token).send(user);
    }).catch((e) => {
        res.status(404).send(e);
    });
 });

 app.get('/users/me',authenticate,(req,res) => {
    if(req.user) {

        res.send(req.user)
    }else {
        res.status(404).send('User Not Found');
    }
 });


 app.post('/users/login',(req,res) => {
    var body = _.pick(req.body,['email','password']);
    User.findByCredentials(body.email,body.password)
        .then((user) => {
                user.generateAuthToken().then((token) => {
                    res.header('x-auth',token).send(user);
                });
        }).catch((e) => {
            res.status(400).send();
        });
    
 })

 app.delete('/users/me/token', authenticate,(req,res) => {
    req.user.removeToken(req.token).then(() => {
        res.status(200).send('Token Deleted');
    }, () => {
        res.status(400).send();
    });
 });

if(process.env.NODE_ENV != 'test') {
app.listen(port, () => {
    console.log(`Started at por ${port}`)
});
}else{
    console.log("Testing process");
}


module.exports = {app};