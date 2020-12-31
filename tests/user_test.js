let mongoose = require("mongoose"); // import mongoose
let {
  user
} = require('../models'); // import user models
let fs = require('fs');

//Require the dev-dependencies
let chai = require('chai'); // import chai for testing assert
let chaiHttp = require('chai-http'); // make virtual server to get/post/put/delete
let server = require('../index.js'); // import app from index
let should = chai.should(); // import assert should from chai
// let transaksi_id; // transaksi_id declaration

chai.use(chaiHttp); // use chaiHttp

describe('user', () => {
  // before((done) => { //Before each test we empty the database
  //   user.remove({}, (err) => {
  //     done();
  //   });
  // });

  /*
   * Test the /GET route
   */
  // describe('/Post Sign Up User', () => {
  //   it('it should Sign Up a A user', () => { //(done) => {
  //     chai.request(server) // request to server (index.js)
  //       .post('/user/signup')
  //       .send({
  //         nama: 'unitTesting',
  //         email: 'unitTesting_timc@gmail.com',
  //         password: 'password1234',
  //         passwordConfirmation: 'password1234'
  //       })
  //       .end((err, res) => {
  //         res.should.have.status(200); // Response Success
  //         res.body.should.be.an('object'); // Body Response should be an object
  //         res.body.should.have.property('message'); // Body Response should have 'status' property
  //         res.body.should.have.property('token'); // Body Response should have 'data' property
  //         // done();
  //       });
  //   });
  // });

  describe('/Post Sign Up User', () => {
    it('email already used, Error', () => { //(done) => {
      chai.request(server) // request to server (index.js)
        .post('/user/signup')
        .send({
          nama: 'seli123',
          email: 'seli_timc@gmail.com', // Email error, has been used
          password: '12345678',
          passwordConfirmation: '12345678'
        })

        .end((err, res) => {
          res.should.have.status(422); // Response should have status 422
          res.body.should.be.an('object'); // Body Response should be an object
          res.body.should.have.property('errors'); // Body Response should have 'errors' property
          res.body.errors.should.have.property('email'); // Body Response should have 'email' property
          res.body.errors.email.should.have.property('value'); // Body Response should have 'msg' property
          res.body.errors.email.should.have.property('msg');
          res.body.errors.email.should.have.property('param');
          res.body.errors.email.should.have.property('location');
          // done();
        });
    });
  });

  describe('/Post Sign Up User', () => {
    it('nama already used, Error', () => { //(done) => {
      chai.request(server) // request to server (index.js)
        .post('/user/signup')
        .send({
          nama: 'seli', // name error, has been used
          email: 'seli@example.com',
          password: '12345678',
          passwordConfirmation: '12345678'
        })
        .end((err, res) => {
          res.should.have.status(422); // Response should have status 422
          res.body.should.be.an('object'); // Body Response should be an object
          res.body.should.have.property('errors'); // Body Response should have 'errors' property
          res.body.errors.should.have.property('nama'); // Body Response should have 'nama' property
          res.body.errors.nama.should.have.property('value'); // Body Response should have 'msg' property
          res.body.errors.nama.should.have.property('msg');
          res.body.errors.nama.should.have.property('param');
          res.body.errors.nama.should.have.property('location');
          // done();
        });
    });
  });

  describe('/Post Sign Up User', () => {
    it('wrong password, Error', () => { //(done) => {
      chai.request(server) // request to server (index.js)
        .post('/user/signup')
        .send({
          nama: 'seli123', // name error, has been used
          email: 'seli@example.com',
          password: '1234567',
          passwordConfirmation: '12345678'
        })
        .end((err, res) => {
          res.should.have.status(422); // Response should have status 422
          res.body.should.be.an('object'); // Body Response should be an object
          res.body.should.have.property('errors'); // Body Response should have 'errors' property
          res.body.errors.should.have.property('passwordConfirmation'); // Body Response should have 'nama' property
          res.body.errors.passwordConfirmation.should.have.property('value'); // Body Response should have 'msg' property
          res.body.errors.passwordConfirmation.should.have.property('msg');
          res.body.errors.passwordConfirmation.should.have.property('param');
          res.body.errors.passwordConfirmation.should.have.property('location');
          // done();
        });
    });
  });

  describe('/post login user', () =>{
    it('it should login user', () => { //(done) => {
      chai.request(server)
      .post('/user/login')
      .send({
        email : 'seli_timc@gmail.com',
        password : 'password1234'
      })
      .end((err,res)=>{
        res.should.have.status(200); // Response Success
        res.body.should.be.an('object'); // Body Response should be an object
        res.body.should.have.property('message'); // Body Response should have 'status' property
        res.body.should.have.property('token'); // Body Response should have 'data' property
        // done();
      })
    })
  })

  describe('/post login user', () =>{
    it('email not exist, Error', () => { //(done) => {
      chai.request(server)
      .post('/user/login')
      .send({
        email : 'seli123@example.com', //email not exist, Error
        password : '12345678'
      })
      .end((err,res)=>{
        res.should.have.status(401); // Response Success
        res.body.should.be.an('object'); // Body Response should be an object
        res.body.should.have.property('status'); // Body Response should have 'status' property
        res.body.should.have.property('message'); // Body Response should have 'data' property
        // done();
      })
    })
  })

  describe('/post login user', () =>{
    it('password wrong , Error', () => { //(done) => {
      chai.request(server)
      .post('/user/login')
      .send({
        email : 'seli@example.com',
        password : '1234567899' //password wrong , Error
      })
      .end((err,res)=>{
        res.should.have.status(401); // Response Success
        res.body.should.be.an('object'); // Body Response should be an object
        res.body.should.have.property('status'); // Body Response should have 'status' property
        res.body.should.have.property('message'); // Body Response should have 'data' property
        // done();
      })
    })
  })

  describe('/GET user profile', () => {
    it('Get user profile', () => { //(done) => {
    chai.request(server)
      .get('/user/profile/tommy_timc@gmail.com')
      .set({Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjVmZTQ1MGJhYjRkN2Y1MzliNDU4Y2FjZiJ9LCJpYXQiOjE2MDkxNTM1NzZ9.wzqFNaN5lOR-DTsUMh4eTWyT0_Pd1UA6OpJPLEg3AUA`})
      .end((err,res) =>{
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.status.should.be.a('string');
        res.body.should.have.property('data');
        res.body.data.should.be.a('object');
        // done();
      })
    })
  })

  describe('/GET user profile', () => {
    it('email not exists, Error', () => { //(done) => {
    chai.request(server)
      .get('/user/profile/tommy_timc@gmail.co')
      .set({Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjVmZTQ1MGJhYjRkN2Y1MzliNDU4Y2FjZiJ9LCJpYXQiOjE2MDkxNTM1NzZ9.wzqFNaN5lOR-DTsUMh4eTWyT0_Pd1UA6OpJPLEg3AUA`})
      .end((err,res) =>{
        res.should.have.status(401);
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.status.should.be.a('string');
        res.body.should.have.property('message');
        res.body.message.should.be.a('string');
        // done();
      })
    })
  })

  describe('/PUT Update user profile', () => {
    it('Update user profile', () => { //(done) => {
    chai.request(server)
      .put('/user/profile/update/unitTesting_timc@gmail.com')
      .set({Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjVmZTljMWJhYThlMWI5NjViYzM3NGE2YiJ9LCJpYXQiOjE2MDkyMTA1MTF9.cFB0n27I7ehtbbgumBEA0YDC56bitfI6WhEeq6YZQeE`})
      .set('content-type','multipart/form-data')
      .field('nama','unitTesting')
      .field('password','password1234')
      .field('passwordConfirmation','password1234')
      .attach('picture','tests/unitTesting.png')
      .end((err,res) =>{
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.status.should.be.a('string');
        res.body.should.have.property('data');
        res.body.data.should.be.a('object');
        res.body.data.should.have.property('picture');
        res.body.data.should.have.property('email');
        res.body.data.should.have.property('nama');
        // done();
      })
    })
  })

  describe('/PUT Update user profile', () => {
    it('Nama already used, Error', () => { //(done) => {
    chai.request(server)
      .put('/user/profile/update/unitTesting_timc@gmail.com')
      .set({Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjVmZTljMWJhYThlMWI5NjViYzM3NGE2YiJ9LCJpYXQiOjE2MDkyMTA1MTF9.cFB0n27I7ehtbbgumBEA0YDC56bitfI6WhEeq6YZQeE`})
      .set('content-type','multipart/form-data')
      .field('nama','tommy')
      .field('password','password1234')
      .field('passwordConfirmation','password1234')
      .attach('picture','tests/unitTesting.png')
      .end((err,res) =>{
        res.should.have.status(422);
        res.body.should.be.a('object');
        res.body.should.have.property('errors');
        res.body.errors.should.be.a('object');
        res.body.errors.should.have.property('nama');
        res.body.errors.nama.should.be.a('object');
        // done();
      })
    })
  })

  describe('/PUT Update user profile', () => {
    it('Nama already used, Error', () => { //(done) => {
    chai.request(server)
      .put('/user/profile/update/unitTesting_timc@gmail.com')
      .set({Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjVmZTljMWJhYThlMWI5NjViYzM3NGE2YiJ9LCJpYXQiOjE2MDkyMTA1MTF9.cFB0n27I7ehtbbgumBEA0YDC56bitfI6WhEeq6YZQeE`})
      .set('content-type','multipart/form-data')
      .field('nama','unitTesting')
      .field('password','password123')
      .field('passwordConfirmation','password1234')
      .attach('picture','tests/unitTesting.png')
      .end((err,res) =>{
        res.should.have.status(422);
        res.body.should.be.a('object');
        res.body.should.have.property('errors');
        res.body.errors.should.be.a('object');
        res.body.errors.should.have.property('passwordConfirmation');
        res.body.errors.passwordConfirmation.should.be.a('object');
        // done();
      })
    })
  })

  describe('/GET User reviews', ()=>{
    it('GET user reviews', ()=> { //(done) => {
      chai.request(server)
        .get('/user/profile/reviews/tommy_timc@gmail.com?page=1')
        .set({Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjVmZTQ1MGJhYjRkN2Y1MzliNDU4Y2FjZiJ9LCJpYXQiOjE2MDkyMTA2MzB9.jXhMYWe5vPhC6d1fIDB7RwxLm_02RCZOh5VQPISQLy0`})
        .end((err,res) =>{
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('resultFound');
          res.body.resultFound.should.be.a('number');
          res.body.should.have.property('currrentPage');
          res.body.currrentPage.should.be.a('number');
          res.body.should.have.property('totalPage');
          res.body.totalPage.should.be.a('number');
          res.body.should.have.property('results');
          res.body.results.should.be.a('array');
          // done()
        })
    })
  })

  describe('/GET User reviews', ()=>{
    it('Page number, Error', ()=> { //(done) => {
      chai.request(server)
        .get('/user/profile/reviews/tommy_timc@gmail.com?page=as')
        .set({Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjVmZTQ1MGJhYjRkN2Y1MzliNDU4Y2FjZiJ9LCJpYXQiOjE2MDkyMTA2MzB9.jXhMYWe5vPhC6d1fIDB7RwxLm_02RCZOh5VQPISQLy0`})
        .end((err,res) =>{
          res.should.have.status(422);
          res.body.should.be.a('object');
          res.body.should.have.property('errors');
          res.body.errors.should.be.a('object');
          res.body.errors.should.have.property('page');
          res.body.errors.page.should.be.a('object');
          // done()
        })
    })
  })

  describe('/GET User reviews', ()=>{
    it('User not found, Error', ()=> { //(done) => {
      chai.request(server)
        .get('/user/profile/reviews/tommy_tim@gmail.com?page=1')
        .set({Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjVmZTQ1MGJhYjRkN2Y1MzliNDU4Y2FjZiJ9LCJpYXQiOjE2MDkyMTA2MzB9.jXhMYWe5vPhC6d1fIDB7RwxLm_02RCZOh5VQPISQLy0`})
        .end((err,res) =>{
          res.should.have.status(401);
          res.body.should.be.a('object');
          res.body.should.have.property('status');
          res.body.status.should.be.a('string');
          res.body.should.have.property('message');
          res.body.message.should.be.a('string');
          // done()
        })
    })
  })

  describe('/POST Add review', ()=> {
    it('POST add review', ()=> { //(done) => {
      chai.request(server)
        .post('/user/review/unitTesting_timc@gmail.com')
        .set({Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjVmZTljMWJhYThlMWI5NjViYzM3NGE2YiJ9LCJpYXQiOjE2MDkyMTA2NzB9.Ipvkyzvq3agz39ZgMmkrzMH68lkb5mwoDTwRo9ceMVk`})
        .send({
          movie:"Logan",
          review:"Loreum",
          rating:5
        })
        .end((err,res) => {
          console.log(res);
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('status');
          res.body.status.should.be.a('string');
          res.body.should.have.property('data');
          res.body.data.should.be.a('object');
          // done()
        })
    })
  })

  describe('/POST Add review', ()=> {
    it('Movie not found, Error', ()=> { //(done) => {
      chai.request(server)
        .post('/user/review/unitTesting_timc@gmail.com')
        .set({Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjVmZTljMWJhYThlMWI5NjViYzM3NGE2YiJ9LCJpYXQiOjE2MDkyMTA2NzB9.Ipvkyzvq3agz39ZgMmkrzMH68lkb5mwoDTwRo9ceMVk`})
        .send({
          movie:"Loga",
          review:"Loreum",
          rating:5
        })
        .end((err,res) => {
          res.should.have.status(422);
          res.body.should.be.a('object');
          res.body.should.have.property('errors');
          res.body.errors.should.be.a('object');
          res.body.errors.should.have.property('movie');
          res.body.errors.movie.should.be.a('object');
          // done()
        })
    })
  })

  describe('/POST Add review', ()=> {
    it('User Not Found, Error', ()=> { //(done) => {
      chai.request(server)
        .post('/user/review/uniTesting_timc@gmail.com')
        .set({Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjVmZTljMWJhYThlMWI5NjViYzM3NGE2YiJ9LCJpYXQiOjE2MDkyMTA2NzB9.Ipvkyzvq3agz39ZgMmkrzMH68lkb5mwoDTwRo9ceMVk`})
        .send({
          movie:"Logan",
          review:"Loreum",
          rating:5
        })
        .end((err,res) => {
          res.should.have.status(422);
          res.body.should.be.a('object');
          res.body.should.have.property('errors');
          res.body.errors.should.be.a('object');
          res.body.errors.should.have.property('email');
          res.body.errors.email.should.be.a('object');
          // done()
        })
    })
  })

  describe('/POST Add review', ()=> {
    it('Rating not within 0-10', ()=> { //(done) => {
      chai.request(server)
        .post('/user/review/unitTesting_timc@gmail.com')
        .set({Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjVmZTljMWJhYThlMWI5NjViYzM3NGE2YiJ9LCJpYXQiOjE2MDkyMTA2NzB9.Ipvkyzvq3agz39ZgMmkrzMH68lkb5mwoDTwRo9ceMVk`})
        .send({
          movie:"Logan",
          review:"Loreum",
          rating:51
        })
        .end((err,res) => {
          res.should.have.status(422);
          res.body.should.be.a('object');
          res.body.should.have.property('errors');
          res.body.errors.should.be.a('object');
          res.body.errors.should.have.property('rating');
          res.body.errors.rating.should.be.a('object');
          // done()
        })
    })
  })

  describe('/PUT Update review', () => {
    it('Put Update review', ()=> { //(done) => {
      chai.request(server)
        .put('/user/review/unitTesting_timc@gmail.com/Logan')
        .set({Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjVmZTljMWJhYThlMWI5NjViYzM3NGE2YiJ9LCJpYXQiOjE2MDkyMTA2NzB9.Ipvkyzvq3agz39ZgMmkrzMH68lkb5mwoDTwRo9ceMVk`})
        .send({
          review:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
          rating:9
        })
        .end((err,res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('status');
          res.body.status.should.be.a('string');
          res.body.should.have.property('data');
          res.body.data.should.be.a('object');
          // done();
        })
    })
  })

  describe('/PUT Update review', () => {
    it('Movie not exist, Error', ()=> { //(done) => {
      chai.request(server)
        .put('/user/review/unitTesting_timc@gmail.com/Loga')
        .set({Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjVmZTljMWJhYThlMWI5NjViYzM3NGE2YiJ9LCJpYXQiOjE2MDkyMTA2NzB9.Ipvkyzvq3agz39ZgMmkrzMH68lkb5mwoDTwRo9ceMVk`})
        .send({
          review:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
          rating:9
        })
        .end((err,res) => {
          res.should.have.status(422);
          res.body.should.be.a('object');
          res.body.should.have.property('errors');
          res.body.errors.should.be.a('object');
          res.body.errors.should.have.property('movie');
          res.body.errors.movie.should.be.a('object');
          // done();
        })
    })
  })

  describe('/PUT Update review', () => {
    it('User not found, Error', ()=> { //(done) => {
      chai.request(server)
        .put('/user/review/unitTesting_tim@gmail.com/Logan')
        .set({Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjVmZTljMWJhYThlMWI5NjViYzM3NGE2YiJ9LCJpYXQiOjE2MDkyMTA2NzB9.Ipvkyzvq3agz39ZgMmkrzMH68lkb5mwoDTwRo9ceMVk`})
        .send({
          review:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
          rating:9
        })
        .end((err,res) => {
          res.should.have.status(422);
          res.body.should.be.a('object');
          res.body.should.have.property('errors');
          res.body.errors.should.be.a('object');
          res.body.errors.should.have.property('email');
          res.body.errors.email.should.be.a('object');
          // done();
        })
    })
  })

  describe('/PUT Update review', () => {
    it('Rating not within 0-10, Error', ()=> { //(done) => {
      chai.request(server)
        .put('/user/review/unitTesting_timc@gmail.com/Logan')
        .set({Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjVmZTljMWJhYThlMWI5NjViYzM3NGE2YiJ9LCJpYXQiOjE2MDkyMTA2NzB9.Ipvkyzvq3agz39ZgMmkrzMH68lkb5mwoDTwRo9ceMVk`})
        .send({
          review:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
          rating:91
        })
        .end((err,res) => {
          res.should.have.status(422);
          res.body.should.be.a('object');
          res.body.should.have.property('errors');
          res.body.errors.should.be.a('object');
          res.body.errors.should.have.property('rating');
          res.body.errors.rating.should.be.a('object');
          // done();
        })
    })
  })

  describe('/DELETE review', () => {
    it('Movie not found, Error', () => { //(done) => {
      chai.request(server)
        .delete('/user/review/unitTesting_timc@gmail.com/Loga')
        .set({Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjVmZTljMWJhYThlMWI5NjViYzM3NGE2YiJ9LCJpYXQiOjE2MDkyMTA2NzB9.Ipvkyzvq3agz39ZgMmkrzMH68lkb5mwoDTwRo9ceMVk`})
        .end((err,res) => {
          res.should.have.status(422);
          res.body.should.be.a('object');
          res.body.should.have.property('errors');
          res.body.errors.should.be.a('object');
          res.body.errors.should.have.property('movie');
          res.body.errors.movie.should.be.a('object');
          // done();
        })
    })
  })

  describe('/DELETE review', () => {
    it('User not exist, Error', () => { //(done) => {
      chai.request(server)
        .delete('/user/review/unitTesting_tim@gmail.com/Logan')
        .set({Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjVmZTljMWJhYThlMWI5NjViYzM3NGE2YiJ9LCJpYXQiOjE2MDkyMTA2NzB9.Ipvkyzvq3agz39ZgMmkrzMH68lkb5mwoDTwRo9ceMVk`})
        .end((err,res) => {
          res.should.have.status(422);
          res.body.should.be.a('object');
          res.body.should.have.property('errors');
          res.body.errors.should.be.a('object');
          res.body.errors.should.have.property('email');
          res.body.errors.email.should.be.a('object');
          // done();
        })
    })
  })

  describe('/DELETE review', () => {
    it('Delete review', () => { //(done) => {
      chai.request(server)
        .delete('/user/review/unitTesting_timc@gmail.com/Logan')
        .set({Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjVmZTljMWJhYThlMWI5NjViYzM3NGE2YiJ9LCJpYXQiOjE2MDkyMTA2NzB9.Ipvkyzvq3agz39ZgMmkrzMH68lkb5mwoDTwRo9ceMVk`})
        .end((err,res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('status');
          res.body.status.should.be.a('string');
          res.body.should.have.property('data');
          // done();
        })
    })
  })




  // describe('/POST Add Movie (Admin)', () =>{
  //   it('Add Movie (Admin) Success', () => { //(done) => {
  //     token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjVmZTM3NGE4ZWQzZDcwMzEwZGQ5OWYzMSJ9LCJpYXQiOjE2MDkxNjU0Njd9.1RyI0ttTymCdlDInS7RTfRM1uxRKeA9zfnDig7WLlT4'
  //     chai.request(server)
  //     .post('/user/addMovie')
  //     .set({ Authorization: `Bearer ${token}` })
  //     .send({
  //       title : 'Mulan',
  //       year : '2020',
  //       released :'2020-04-09',
  //       runtime : '115 mins',
  //       genre :'action',
  //       director : 'Admin',
  //       writer : 'admin',
  //       actors : 'Admin1, admin 2, admin 3',
  //       plot : 'In Imperial China, Hua Mulan is an adventurous and active girl, to the disappointment of her parents, who hopes that one day she will be wed to a good husband. As a young woman, Mulan is forced to meet with a matchmaker to demonstrate her fitness as a future wife. Mulan, flustered, attempts to pour tea in front of the matchmaker, but a spider causes a panic that destroys the kettle, and the matchmaker calls her a disgrace in front of her family.',
  //       language : 'english',
  //       country : 'USA',
  //       poster : 'https://upload.wikimedia.org/wikipedia/en/1/17/Mulan_%282020_film%29_poster.jpg',
  //       trailer: 'https://www.youtube.com/watch?v=UgF2loD5xkw'
  //     })
  //     .end((err, res) =>{
  //       res.should.have.status(200); // Response Success
  //       res.body.should.be.an('object'); // Body Response should be an object
  //       res.body.should.have.property('status'); // Body Response should have 'status' property
  //       res.body.should.have.property('data'); // Body Response should have 'data' property
  //       res.body.data.should.be.an('object');
  //       // done():
  //     })
  //   })
  // })

  describe('/POST Add Movie (Admin)', () =>{
    it('year not in year format (YYYY), Error', () => { //(done) => {
      token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjVmZTM3NGE4ZWQzZDcwMzEwZGQ5OWYzMSJ9LCJpYXQiOjE2MDkxNjU0Njd9.1RyI0ttTymCdlDInS7RTfRM1uxRKeA9zfnDig7WLlT4'
      chai.request(server)
      .post('/user/addMovie')
      .set({ Authorization: `Bearer ${token}` })
      .send({
        title : 'Mulan',
        year : '20aa',
        released :'2020-04-09',
        runtime : '115 mins',
        genre :'action',
        director : 'Admin',
        writer : 'admin',
        actors : 'Admin1, admin 2, admin 3',
        plot : 'In Imperial China, Hua Mulan is an adventurous and active girl, to the disappointment of her parents, who hopes that one day she will be wed to a good husband. As a young woman, Mulan is forced to meet with a matchmaker to demonstrate her fitness as a future wife. Mulan, flustered, attempts to pour tea in front of the matchmaker, but a spider causes a panic that destroys the kettle, and the matchmaker calls her a disgrace in front of her family.',
        language : 'english',
        country : 'USA',
        poster : 'https://upload.wikimedia.org/wikipedia/en/1/17/Mulan_%282020_film%29_poster.jpg',
        trailer: 'https://www.youtube.com/watch?v=UgF2loD5xkw'
      })
      .end((err, res) =>{
        console.log(res);
        res.should.have.status(422); // Response
        res.body.should.be.an('object'); // Body Response should be an object
        res.body.should.have.property('errors'); // Body Response should have 'status' property
        res.body.errors.should.have.property('year'); // Body Response should have 'data' property
        res.body.should.be.an('object');
        // done();
      })
    })
  })

  describe('/POST Add Movie (Admin)', () =>{
    it('released not in Date format (YYYY-MM-DD), Error', () => { //(done) => {
      token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjVmZTM3NGE4ZWQzZDcwMzEwZGQ5OWYzMSJ9LCJpYXQiOjE2MDkxNjU0Njd9.1RyI0ttTymCdlDInS7RTfRM1uxRKeA9zfnDig7WLlT4'
      chai.request(server)
      .post('/user/addMovie')
      .set({ Authorization: `Bearer ${token}` })
      .send({
        title : 'Mulan',
        year : '2020',
        released :'202i-04-09',
        runtime : '115 mins',
        genre :'action',
        director : 'Admin',
        writer : 'admin',
        actors : 'Admin1, admin 2, admin 3',
        plot : 'In Imperial China, Hua Mulan is an adventurous and active girl, to the disappointment of her parents, who hopes that one day she will be wed to a good husband. As a young woman, Mulan is forced to meet with a matchmaker to demonstrate her fitness as a future wife. Mulan, flustered, attempts to pour tea in front of the matchmaker, but a spider causes a panic that destroys the kettle, and the matchmaker calls her a disgrace in front of her family.',
        language : 'english',
        country : 'USA',
        poster : 'https://upload.wikimedia.org/wikipedia/en/1/17/Mulan_%282020_film%29_poster.jpg',
        trailer: 'https://www.youtube.com/watch?v=UgF2loD5xkw'
      })
      .end((err, res) =>{
        res.should.have.status(422); // Response
        res.body.should.be.an('object'); // Body Response should be an object
        res.body.should.have.property('errors'); // Body Response should have 'status' property
        res.body.errors.should.have.property('released'); // Body Response should have 'data' property
        res.body.should.be.an('object');
        // done();
      })
    })
  })

  describe('/POST Add Movie (Admin)', () =>{
    it('poster not in URL format, Error',() => { //(done) => {
      token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjVmZTM3NGE4ZWQzZDcwMzEwZGQ5OWYzMSJ9LCJpYXQiOjE2MDkxNjU0Njd9.1RyI0ttTymCdlDInS7RTfRM1uxRKeA9zfnDig7WLlT4'
      chai.request(server)
      .post('/user/addMovie')
      .set({ Authorization: `Bearer ${token}` })
      .send({
        title : 'Mulan',
        year : '2020',
        released :'2020-04-09',
        runtime : '115 mins',
        genre :'action',
        director : 'Admin',
        writer : 'admin',
        actors : 'Admin1, admin 2, admin 3',
        plot : 'In Imperial China, Hua Mulan is an adventurous and active girl, to the disappointment of her parents, who hopes that one day she will be wed to a good husband. As a young woman, Mulan is forced to meet with a matchmaker to demonstrate her fitness as a future wife. Mulan, flustered, attempts to pour tea in front of the matchmaker, but a spider causes a panic that destroys the kettle, and the matchmaker calls her a disgrace in front of her family.',
        language : 'english',
        country : 'USA',
        poster : 'timc',
        trailer: 'https://www.youtube.com/watch?v=UgF2loD5xkw'
      })
      .end((err, res) =>{
        res.should.have.status(422); // Response
        res.body.should.be.an('object'); // Body Response should be an object
        res.body.should.have.property('errors'); // Body Response should have 'status' property
        res.body.errors.should.have.property('poster'); // Body Response should have 'data' property
        res.body.should.be.an('object');
        // done();
      })
    })
  })

  describe('/POST Add Movie (Admin)', () =>{
    it('trailer not in URL format, Error',() => { //(done) => {
      token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjVmZTM3NGE4ZWQzZDcwMzEwZGQ5OWYzMSJ9LCJpYXQiOjE2MDkxNjU0Njd9.1RyI0ttTymCdlDInS7RTfRM1uxRKeA9zfnDig7WLlT4'
      chai.request(server)
      .post('/user/addMovie')
      .set({ Authorization: `Bearer ${token}` })
      .send({
        title : 'Mulan',
        year : '2020',
        released :'2020-04-09',
        runtime : '115 mins',
        genre :'action',
        director : 'Admin',
        writer : 'admin',
        actors : 'Admin1, admin 2, admin 3',
        plot : 'In Imperial China, Hua Mulan is an adventurous and active girl, to the disappointment of her parents, who hopes that one day she will be wed to a good husband. As a young woman, Mulan is forced to meet with a matchmaker to demonstrate her fitness as a future wife. Mulan, flustered, attempts to pour tea in front of the matchmaker, but a spider causes a panic that destroys the kettle, and the matchmaker calls her a disgrace in front of her family.',
        language : 'english',
        country : 'USA',
        poster : 'https://www.youtube.com/watch?v=UgF2loD5xkw',
        trailer: 'timc'
      })
      .end((err, res) =>{
        res.should.have.status(422); // Response
        res.body.should.be.an('object'); // Body Response should be an object
        res.body.should.have.property('errors'); // Body Response should have 'status' property
        res.body.errors.should.have.property('trailer'); // Body Response should have 'data' property
        res.body.should.be.an('object');
        // done();
      })
    })
  })


})
