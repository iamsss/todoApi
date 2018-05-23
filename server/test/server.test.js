const expect = require('expect');
const request = require('supertest');

const {
    app
} = require('./../server');
const {
    Todo
} = require('./../models/todo');
const {
    todos,
    populateTodos,
    populateUsers,
    users
} = require('./seed/seed');



beforeEach(populateTodos); // Just to clear data
beforeEach(populateUsers);
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


    // it('should have two items in todos', (done)=> {
    //     var text ='';
    //     request(app)
    //     .get('/todos')
    //     .expect(200)
    //     .end((err,res) => {
    //         if(err){
    //             return done(err);
    //         }
    //         Todo.find().then((todos) => {
    //             expect(todos.length).toBe(2);
    //             done();
    //         }).catch((e) => done(e))


    //     })
    // })

    // it('should have these todos', (done)=> {
    //     var text1 ='First test Todo';
    //     request(app)
    //     .get('/todos')
    //     .expect(200)
    //     .end((err,res) => {
    //         if(err){
    //             return done(err);
    //         }
    //         Todo.find().then((todos) => {
    //             expect(todos.length).toBe(2);
    //             expect(todos[0].text).toBe(text1);
    //             done();
    //         }).catch((e) => done(e))


    //     })
    // })

    // it('Should Found The Result', (done)=> {
    //     var Id ='5b03c5e51215f7641c51386b';
    //     request(app)
    //     .get('/todos/'+ Id)
    //     .expect(200)
    //     .end((err,res) => {
    //         if(err){
    //             return done(err);
    //         }
    //         Todo.find().then((todos) => {
    //             expect(todos.length).toBe(1);
    //             expect(todos[0].text).toBe('this is from PostMAn 1');
    //             done();
    //         }).catch((e) => done(e))


    //     })
    // })

    // it('should return 404 Not Found When Invalid Id Send', (done)=> {
    //     var InvalidId ='6b03bed9b5d0ef381164123f';
    //     request(app)
    //     .get('/todos/'+ InvalidId)
    //     .expect(404)
    //     .end((err,res) => {
    //         if(err){
    //             return done(err);
    //         }
    //         Todo.find().then((todos) => {

    //             done();
    //         }).catch((e) => done(e))


    //     })
    // })


    // it('should return 400 When Invalid ID send', (done)=> {
    //     var id ='qwer';
    //     request(app)
    //     .get('/todos/' + id)
    //     .expect(400)
    //     .end((err,res) => {
    //         if(err){
    //             return done(err);
    //         }
    //         Todo.find().then((todos) => {
    //             done();
    //         }).catch((e) => done(e))


    //     })
    // })




    // it('Should Delete The Result', (done)=> {
    //     var Id ='5b0441e3d94b38181f0e3fb0';
    //     request(app)
    //     .get('/todos/'+ Id)
    //     .expect(200)
    //     .end((err,res) => {
    //         if(err){
    //             return done(err);
    //         }
    //         Todo.find().then((todos) => {
    //             expect(todos[0].text).toBe('this is from PostMAn 2');
    //             done();
    //         }).catch((e) => done(e))


    //     })
    // })

    it('should return 404 Not Found When Invalid Id Send', (done) => {
        var InvalidId = '5b056b2edc34586826d2f80f';
        request(app)
            .get('/todos/' + InvalidId)
            .expect(404)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                Todo.find().then((todos) => {

                    done();
                }).catch((e) => done(e))


            })
    })


    it('should return 400 When Invalid ID send', (done) => {
        var id = 'qwer';
        request(app)
            .get('/todos/' + id)
            .expect(400)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                Todo.find().then((todos) => {
                    done();
                }).catch((e) => done(e))


            })
    })
});

describe('Get User/me', () => {

    it('should check if user is authenticated', (done) => {

        request(app)
            .get('/users/me')
            .set('x-auth', users[0].tokens[0].token)
            .expect(200)
            .expect((res) => {
                expect(res.body._id).toBe(users[0]._id.toHexString());
                expect(res.body.email).toBe(users[0].email);

            }).end(done);
    });

    it('should return 401 when no header sent', (done) => {
      
        request(app)
            .get('/users/me')
            .expect(401).end(done);
    });

    it('should return 401 if unvalid token send', (done) => {
        var unvalidToken = 'shjhbjdh';
        request(app)
            .get('/users/me')
            .set('x-auth', unvalidToken)
            .expect(401).end(done);
    });

});

describe('POST /users',() => {
    it('should create a valid user',(done) => {
        var email = 'saura@gmail.com';
        var password = 'qwert12345';

        request(app)
        .post('/users')
        .send({ email, password })
        .expect(200).expect((res) => {
            expect(res.headers['x-auth']).toExist();
            expect(res.body._id).toExist();
        }).end(done);
    })

    it('should return validation error if email is not valid',(done) => {
        var email = 'sauragmail.com';
        var password = 'qwe';

        request(app)
        .post('/users')
        .send({ email, password })
        .expect(404).end(done);
    })
})

describe('Login Test /users/login',() => {

    it('should return 400 when wrong email send',(done) => {
        var email = 'saura@gmail.com';
        var password = 'qw342dfse';

        request(app)
        .post('/users/login')
        .send({ email, password })
        .expect(400).end(done);
    });

    it('should return 400 when wrong password send',(done) => {
        var email = 'saurav@gmail.com';
        var password = 'qw342dfsse';

        request(app)
        .post('/users/login')
        .send({ email, password })
        .expect(400).end(done);
    });

    it('should login sucess when correct email n pass given',(done) => {
        var email = 'saurav@gmail.com';
        var password = 'password';

        request(app)
        .post('/users/login')
        .send({ email, password })
        .expect(200).expect((res) => {
            expect(res.headers['x-auth']).toExist();
            expect(res.body.email).toExist(); 
            expect(res.body._id).toExist();
        }).end(done);
    })

});

