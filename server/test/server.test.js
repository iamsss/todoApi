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

const {
    User
} = require('./../models/user');

/* In expect upgrade tobeExist is similar to tobetruthy
 and tonotbeexist is tobe falsy */


beforeEach(populateTodos); // Just to clear data
beforeEach(populateUsers);
describe('POST /todos', () => {
    it('should create a new todo', (done) => {
        var text ='Test';
        request(app)
        .post('/todos')
        .set('x-auth',users[0].tokens[0].token)
        .send({text})
        .expect(200)
        .expect((res) => {
            expect(res.body.text).toBe(text);
        })
        .end((err,res) => {
            if(err){
                return done(err);
            }

        Todo.find().then((todos) => {
            expect(todos.length).toBe(3);
            expect(todos[2].text).toBe(text);
            done();
        }).catch((e) => done(e))
    })
    });

    it('should expect 401 when no token send', (done) => {
        var text ='Test';
        request(app)
        .post('/todos')
        .send({text})
        .expect(401)
        .end(done);
    });

    it('should expect 401 when no token send and try to get all todos', (done) => {
        var text ='Test';
        request(app)
        .get('/todos')
        .expect(401)
        .end(done);
    });

    it('should return 2 data out of 3', (done) => {
        var text ='Test';
        request(app)
        .get('/todos')
        .set('x-auth',users[0].tokens[0].token)
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
    });

    it('should not create any todo with invalid body', (done)=> {
        var text ='';
        request(app)
        .post('/todos')
        .set('x-auth',users[0].tokens[0].token)
        .send({text})
        .expect(400)
        .end((err,res) => {
            if(err){
                return done(err);
            }

            done();

        })
    })


    

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

    
it('Should Found The Result', (done)=> {
        var Id = todos[0]._id;
        request(app)
        .get('/todos/'+ Id)
        .set('x-auth',users[0].tokens[0].token)
        .expect(200)
        .end((err,res) => {
            if(err){
                return done(err);
            }
           expect(res.body.text).toBe(todos[0].text);
           done();


        })
    })

    it('Should return 404 when others id try to fetch', (done)=> {
        var Id = todos[1]._id;
        request(app)
        .get('/todos/'+ Id)
        .set('x-auth',users[0].tokens[0].token)
        .expect(404)
        .end(done);
    })

    it('Should Return 401 when no header sent', (done)=> {
        var Id =todos[0]._id;
        request(app)
        .get('/todos/'+ Id)
        .expect(401)
        .end(done);
        
    })


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




    

    it('should return 404 Not Found When Invalid Id Send', (done) => {
        var InvalidId = '5b056b2edc34586826d2f80f';
        request(app)
            .get('/todos/' + InvalidId)
            .set('x-auth',users[0].tokens[0].token)
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
            .set('x-auth',users[0].tokens[0].token)
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

    it('Deletion failed return 404 when id of other user send', (done)=> {
        var Id =todos[1]._id;
        request(app)
        .delete('/todos/'+ Id)
        .set('x-auth',users[0].tokens[0].token)
        .expect(404)
        .end(done);
    })

    it('Should return 401 when token not sendd', (done)=> {
        var Id =todos[0]._id;
        request(app)
        .delete('/todos/'+ Id)
        .expect(401)
        .end(done);
    })

    it('Should Delete The Result', (done)=> {
        var Id =todos[0]._id;
        request(app)
        .delete('/todos/'+ Id)
        .set('x-auth',users[0].tokens[0].token)
        .expect(200)
        .end((err,res) => {
            if(err){
                return done(err);
            }
            expect(res.body.text).toBe(todos[0].text);
            done();


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

describe('POST /users', () => {
    it('should create a valid user', (done) => {
        var email = 'saura@gmail.com';
        var password = 'qwert12345';

        request(app)
            .post('/users')
            .send({
                email,
                password
            })
            .expect(200).expect((res) => {
                expect(res.headers['x-auth']).toBeTruthy();
                expect(res.body._id).toBeTruthy();
            }).end(done);
    })

    it('should return validation error if email is not valid', (done) => {
        var email = 'sauragmail.com';
        var password = 'qwe';

        request(app)
            .post('/users')
            .send({
                email,
                password
            })
            .expect(404).end(done);
    })
})

describe('Login Test /users/login', () => {

    it('should return 400 when wrong email send', (done) => {
        var email = 'saura@gmail.com';
        var password = 'qw342dfse';

        request(app)
            .post('/users/login')
            .send({
                email,
                password
            })
            .expect(400).end(done);
    });

    it('should return 400 when wrong password send', (done) => {
        var email = 'saurav@gmail.com';
        var password = 'qw342dfsse';

        request(app)
            .post('/users/login')
            .send({
                email,
                password
            })
            .expect(400).end(done);
    });

    it('should login sucess when correct email n pass given', (done) => {
        var email = 'saurav@gmail.com';
        var password = 'password';

        request(app)
            .post('/users/login')
            .send({
                email,
                password
            })
            .expect(200).expect((res) => {
                expect(res.headers['x-auth']).toBeTruthy();
                expect(res.body.email).toBeTruthy();
                expect(res.body._id).toBeTruthy();
            }).end(done);
    })

});




describe('Delete User/me/token', () => {

    it('Token should not exists in data base after logout', (done) => {

        request(app)
            .delete('/users/me/token')
            .set('x-auth', users[0].tokens[0].token)
            .expect(200)
            .expect((res) => {
                User.findById(users[0]._id).then((user) => {
                    expect(Boolean(user.tokens.length)).toBe(false);
                });

            }).end(done);
    });

    it('Should Return 401 when unautherie token send', (done) => {

        request(app)
            .delete('/users/me/token')
            .set('x-auth', 'hjhhgfghhg')
            .expect(401)
            .end(done);
    });

    it('Should Return 401 when no token send', (done) => {

        request(app)
            .delete('/users/me/token')
            .expect(401)
            .end(done);
    });



});



describe('Get User/me', () => {

    it('After Logout it shout return 404 Not Found', (done) => {


        request(app)
        .delete('/users/me/token')
        .set('x-auth', users[0].tokens[0].token)
        .expect(200)
        .expect((res) => { 
            request(app)
            .get('/users/me')
            .set('x-auth', users[0].tokens[0].token)
            .expect(404);
            }).end(done);
       
    });
});