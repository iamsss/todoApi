const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

// Dummy Data
const todos = [{
    text: 'First test Todo'
}, {
    text: 'Second test todos'
}]

beforeEach((done) => {
    Todo.remove({}).then(()=> {
        return Todo.insertMany(todos);
    }).then(() => done());
}); // Just to clear data
describe('POST /todos', () => {
    // it('should create a new todo', (done) => {
    //     var text ='Test';
    //     request(app)
    //     .post('/todos')
    //     .send({text})
    //     .expect(200)
    //     .expect((res) => {
    //         expect(res.body.text).toBe(text);
    //     })
    //     .end((err,res) => {
    //         if(err){
    //             return done(err);
    //         }

        //     Todo.find().then((todos) => {
        //         expect(todos.length).toBe(2);
        //         expect(todos[0].text).toBe(text);
        //         done();
        //     }).catch((e) => done(e))
        // })
    // });

    // it('should not create any todo with invalid body', (done)=> {
    //     var text ='';
    //     request(app)
    //     .post('/todos')
    //     .send({text})
    //     .expect(400)
    //     .end((err,res) => {
    //         if(err){
    //             return done(err);
    //         }

    //         done();
           
    //     })
    // })


    it('should have two items in todos', (done)=> {
        var text ='';
        request(app)
        .get('/todos')
        .expect(200)
        .end((err,res) => {
            if(err){
                return done(err);
            }
            Todo.find().then((todos) => {
                expect(todos.length).toBe(2);
                done();
            }).catch((e) => done(e))
            
           
        })
    })

    it('should have these todos', (done)=> {
        var text1 ='First test Todo';
        request(app)
        .get('/todos')
        .expect(200)
        .end((err,res) => {
            if(err){
                return done(err);
            }
            Todo.find().then((todos) => {
                expect(todos.length).toBe(2);
                expect(todos[0].text).toBe(text1);
                done();
            }).catch((e) => done(e))
            
           
        })
    })
});