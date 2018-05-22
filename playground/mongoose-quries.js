const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');

var id ='5b03ba5c686ce9ac105c67c2';

if(!ObjectID.isValid(id)){
    console.log('ID Not Valid');
}

Todo.find({
    _id: id
}).then((todos) => {
    console.log('Todos: ',todos);
})

Todo.findOne({
    _id: id
}).then((todos) => {
    console.log('Todo : s',todos);
})

Todo.findById(id).then((todos) => {
    if(!todos){
        console.log('Id not found');
    }
    console.log('Todo By Id ', todos);
}).catch((e) => {

    console.log('There is Error : ' , e);
});