let mongoose = require("mongoose"); // import mongoose
let {
  movie
} = require('../models'); // import user models

//Require the dev-dependencies
let chai = require('chai'); // import chai for testing assert
let chaiHttp = require('chai-http'); // make virtual server to get/post/put/delete
let server = require('../index.js'); // import app from index
let should = chai.should(); // import assert should from chai


chai.use(chaiHttp); // use chaiHttp

describe('movie', () => {
  // before((done) => { //Before each test we empty the database
  //   movie.remove({}, (err) => {
  //     done();
  //   });
  // });

  /*
   * Test the /GET route
   */
  describe('/get all movie', () => {
    it('get all movie',() => { //(done) => {
      chai.request(server) // request to server (index.js)
        .get('/category?page=1')
        .send({})
        .end((err, res) => {
          res.should.have.status(200); // Response Success
          res.body.should.be.an('object'); // Body Response should be an object
          res.body.should.have.property('resultFound'); // Body Response should have 'status' property
          res.body.resultFound.should.be.a('number');
          res.body.should.have.property('currrentPage');
          res.body.currrentPage.should.be.a('number');
          res.body.should.have.property('totalPage');
          res.body.totalPage.should.be.a('number');
          res.body.should.have.property('results'); // Body Response should have 'data' property
          res.body.results.should.be.an('array');
          // done();
        });
    });
  });

  describe('/get all movie', () => {
    it('page not number , Error',() => { //(done) => {
      chai.request(server) // request to server (index.js)
        .get('/category?page=a')
        .send({})
        .end((err, res) => {
          res.should.have.status(422); // Response Success
          res.body.should.be.an('object'); // Body Response should be an object
          res.body.should.have.property('errors'); // Body Response should have 'status' property
          res.body.errors.should.be.a('object');

          // done();
        });
    });
  });

  describe('/get category action movie', () => {
    it('get category action movie', () => { //(done) => {
      chai.request(server) // request to server (index.js)
        .get('/category/action?page=1')
        .send({})
        .end((err, res) => {
          res.should.have.status(200); // Response Success
          res.body.should.be.an('object'); // Body Response should be an object
          res.body.should.have.property('resultFound'); // Body Response should have 'status' property
          res.body.resultFound.should.be.a('number');
          res.body.should.have.property('currrentPage');
          res.body.currrentPage.should.be.a('number');
          res.body.should.have.property('totalPage');
          res.body.totalPage.should.be.a('number');
          res.body.should.have.property('results'); // Body Response should have 'data' property
          res.body.results.should.be.an('array');
          // done();
        });
    });
  });

  describe('/get category action movie', () => {
    it('page not number , Error', () => { //(done) => {
      chai.request(server) // request to server (index.js)
        .get('/category/action?page=a')
        .send({})
        .end((err, res) => {
          res.should.have.status(422); // Response Success
          res.body.should.be.an('object'); // Body Response should be an object
          res.body.should.have.property('errors'); // Body Response should have 'status' property
          res.body.errors.should.be.a('object');

          // done();
        });
    });
  });

  describe('/get category comedy movie', () => {
    it('get category comedy movie', () => { //(done) => {{
      chai.request(server) // request to server (index.js)
        .get('/category/comedy?page=1')
        .send({})
        .end((err, res) => {
          res.should.have.status(200); // Response Success
          res.body.should.be.an('object'); // Body Response should be an object
          res.body.should.have.property('resultFound'); // Body Response should have 'status' property
          res.body.resultFound.should.be.a('number');
          res.body.should.have.property('currrentPage');
          res.body.currrentPage.should.be.a('number');
          res.body.should.have.property('totalPage');
          res.body.totalPage.should.be.a('number');
          res.body.should.have.property('results'); // Body Response should have 'data' property
          res.body.results.should.be.an('array');
          // done();
        });
    });
  });

  describe('/get category comedy movie', () => {
    it('page not number , Error', () => { //(done) => {
      chai.request(server) // request to server (index.js)
        .get('/category/comedy?page=a')
        .send({})
        .end((err, res) => {
          res.should.have.status(422); // Response Success
          res.body.should.be.an('object'); // Body Response should be an object
          res.body.should.have.property('errors'); // Body Response should have 'status' property
          res.body.errors.should.be.a('object');

          // done();
        });
    });
  });

  describe('/get category drama movie', () => {
    it('get category drama movie', () => { //(done) => {
      chai.request(server) // request to server (index.js)
        .get('/category/drama?page=1')
        .send({})
        .end((err, res) => {
          res.should.have.status(200); // Response Success
          res.body.should.be.an('object'); // Body Response should be an object
          res.body.should.have.property('resultFound'); // Body Response should have 'status' property
          res.body.resultFound.should.be.a('number');
          res.body.should.have.property('currrentPage');
          res.body.currrentPage.should.be.a('number');
          res.body.should.have.property('totalPage');
          res.body.totalPage.should.be.a('number');
          res.body.should.have.property('results'); // Body Response should have 'data' property
          res.body.results.should.be.an('array');
          // done();
        });
    });
  });

  describe('/get category drama movie', () => {
    it('page not number , Error', () => { //(done) => {
      chai.request(server) // request to server (index.js)
        .get('/category/drama?page=a')
        .send({})
        .end((err, res) => {
          res.should.have.status(422); // Response Success
          res.body.should.be.an('object'); // Body Response should be an object
          res.body.should.have.property('errors'); // Body Response should have 'status' property
          res.body.errors.should.be.a('object');

          // done();
        });
    });
  });

  describe('/get category drama animation', () => {
    it('get category animation movie', () => { //(done) => {
      chai.request(server) // request to server (index.js)
        .get('/category/animation?page=1')
        .send({})
        .end((err, res) => {
          res.should.have.status(200); // Response Success
          res.body.should.be.an('object'); // Body Response should be an object
          res.body.should.have.property('resultFound'); // Body Response should have 'status' property
          res.body.resultFound.should.be.a('number');
          res.body.should.have.property('currrentPage');
          res.body.currrentPage.should.be.a('number');
          res.body.should.have.property('totalPage');
          res.body.totalPage.should.be.a('number');
          res.body.should.have.property('results'); // Body Response should have 'data' property
          res.body.results.should.be.an('array');
          // done();
        });
    });
  });

  describe('/get category animation movie', () => {
    it('page not number , Error', () => { //(done) => {
      chai.request(server) // request to server (index.js)
        .get('/category/animation?page=a')
        .send({})
        .end((err, res) => {
          res.should.have.status(422); // Response Success
          res.body.should.be.an('object'); // Body Response should be an object
          res.body.should.have.property('errors'); // Body Response should have 'status' property
          res.body.errors.should.be.a('object');

          // done();
        });
    });
  });

  describe('/get category biography animation', () => {
    it('get category biography movie',() => { //(done) => {
      chai.request(server) // request to server (index.js)
        .get('/category/biography?page=1')
        .send({})
        .end((err, res) => {
          res.should.have.status(200); // Response Success
          res.body.should.be.an('object'); // Body Response should be an object
          res.body.should.have.property('resultFound'); // Body Response should have 'status' property
          res.body.resultFound.should.be.a('number');
          res.body.should.have.property('currrentPage');
          res.body.currrentPage.should.be.a('number');
          res.body.should.have.property('totalPage');
          res.body.totalPage.should.be.a('number');
          res.body.should.have.property('results'); // Body Response should have 'data' property
          res.body.results.should.be.an('array');
          // done();
        });
    });
  });

  describe('/get category biography movie', () => {
    it('page not number , Error', () => { //(done) => {
      chai.request(server) // request to server (index.js)
        .get('/category/biography?page=a')
        .send({})
        .end((err, res) => {
          res.should.have.status(422); // Response Success
          res.body.should.be.an('object'); // Body Response should be an object
          res.body.should.have.property('errors'); // Body Response should have 'status' property
          res.body.errors.should.be.a('object');

          // done();
        });
    });
  });


})
