const {ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken');

const {Todo} = require('./../../models/todo');
const {User} = require('./../../models/user');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();


const users = [{
_id: userOneId,
email: 'saurav@gmail.com',
password: 'password',
tokens: [{
    access: 'auth',
    token: jwt.sign({_id:userOneId, access: 'auth'},'abc123').toString()
}]
}, {
    _id: userTwoId,
    email: 'saurav21@gmail.com',
    password: 'qwert12345',
    tokens: [{
        access: 'auth',
        token: jwt.sign({_id:userTwoId, access: 'auth'},'abc123').toString()
    }]
     

}];

const populateUsers = (done) => {
    User.remove({}).then(() => {
        var userOne = new User(users[0]).save();
        var userTwo = new User(users[1]).save();

      return  Promise.all([userOne,userTwo])
    }).then(() => done());
}

const todos = [{
    _id: new ObjectID(),
    text: 'First test Todo',
    _creator: userOneId
}, {
    _id: new ObjectID(),
    text: 'Second test todos',
    completed: true,
    _creator: userTwoId
}];

const populateTodos = (done) => {
    Todo.remove({}).then(() => {
        Todo.insertMany(todos);
    }).then(() => done());
};

module.exports = {
    todos,
    populateTodos,
    users,
    populateUsers
};