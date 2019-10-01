process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');

const { exec } = require('child_process');

const server = require('../app.js');
const db = require('../db/database.js');

chai.should();

chai.use(chaiHttp);

describe('Index', () => {
    before(() => {
        return new Promise(resolve => {
            db.run('DELETE FROM users', err => {
                if (err) {
                    console.error('Could not empty test DB users', err.message);
                }

                db.run('DELETE FROM reports', err => {
                    if (err) {
                        console.error('Could not empty test DB reports', err.message);
                    }

                    exec(
                        'cat db/seed_test.sql | sqlite3 db/test.sqlite',
                        (error, stdout, stderr) => {
                            if (error) {
                                console.error(error.message);
                                return;
                            }

                            if (stderr) {
                                console.error(stderr);
                                return;
                            }

                            resolve();
                        },
                    );
                });
            });
        });
    });

    describe('GET /', () => {
        it('200 HAPPY PATH', done => {
            chai.request(server)
                .get('/')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an('object');
                    // res.body.data.should.be.an('array');
                    // res.body.data.report.length.should.be.above(0);

                    done();
                });
        });
    });

    describe('POST /register', () => {
        it('201 HAPPY PATH', done => {
            chai.request(server)
                .post('/register')
                .send({
                    name: 'Jimmy',
                    email: 'jimmy@test.com',
                    password: '123',
                    birthday: '1989/05/27',
                })
                // .expect(201)
                .end((err, res) => {
                    // console.log(res);
                    if (err) {
                        done(err);
                    }
                    // res.should.have.status(201);
                    res.body.should.be.an('object');
                    // res.body.data.should.be.an('array');
                    // res.body.data.report.length.should.be.above(0);

                    done();
                });
        });
    });

    describe('POST /login', () => {
        it('201 HAPPY PATH', done => {
            chai.request(server)
                .post('/login')
                .send({
                    email: 'jimmy@test.com',
                    password: '123',
                })
                // .expect(201)
                .end((err, res) => {
                    // console.log(res);
                    if (err) {
                        done(err);
                    }
                    // res.should.have.status(201);
                    res.body.should.be.an('object');
                    // res.body.data.should.be.an('array');
                    // res.body.data.report.length.should.be.above(0);

                    done();
                });
        });
    });
});

// ##################  Reports test   ################################################

// describe('Reports', () => {
//     before(() => {
//         return new Promise(resolve => {
//             // db.run('DELETE FROM users', err => {
//             //     if (err) {
//             //         console.error('Could not empty test DB users', err.message);
//             //     }

//             db.run('DELETE FROM reports', err => {
//                 if (err) {
//                     console.error('Could not empty test DB reports', err.message);
//                 }

//                 exec('cat db/seed_test.sql | sqlite3 db/test.sqlite', (error, stdout, stderr) => {
//                     if (error) {
//                         console.error(error.message);
//                         return;
//                     }

//                     if (stderr) {
//                         console.error(stderr);
//                         return;
//                     }

//                     resolve();
//                 });
//             });
//             // });
//         });
//     });

//     describe('POST /reports', () => {
//         it('500 NEGATIVE PATH (JWT error)', done => {
//             chai.request(server)
//                 .post('/reports')
//                 .send({
//                     week: 'kmom05',
//                     title: 'Kursmoment 5',
//                     text: 'Test',
//                 })
//                 // .expect(201)
//                 .end((err, res) => {
//                     // console.log(res);
//                     if (err) done(err);
//                     res.should.have.status(500);
//                     // res.body.should.be.an('object');
//                     // res.body.data.should.be.an('array');
//                     // res.body.data.report.length.should.be.above(0);

//                     done();
//                 });
//         });
//     });

//     describe('GET /reports/kmom01', () => {
//         it('200 HAPPY PATH', done => {
//             chai.request(server)
//                 .get('/reports/kmom01')
//                 .end((err, res) => {
//                     res.should.have.status(200);
//                     res.body.should.be.an('object');
//                     // res.body.data.should.be.an('array');
//                     // res.body.data.report.length.should.be.above(0);

//                     done();
//                 });
//         });
//     });

//     describe('GET /reports/kmom02', () => {
//         it('200 HAPPY PATH', done => {
//             chai.request(server)
//                 .get('/reports/kmom02')
//                 .end((err, res) => {
//                     res.should.have.status(200);
//                     res.body.should.be.an('object');
//                     // res.body.data.should.be.an('array');
//                     // res.body.data.report.length.should.be.above(0);

//                     done();
//                 });
//         });
//     });

//     describe('GET /reports/kmom03', () => {
//         it('200 HAPPY PATH', done => {
//             chai.request(server)
//                 .get('/reports/kmom03')
//                 .end((err, res) => {
//                     res.should.have.status(200);
//                     res.body.should.be.an('object');
//                     // res.body.data.should.be.an('array');
//                     // res.body.data.report.length.should.be.above(0);

//                     done();
//                 });
//         });
//     });
// });
