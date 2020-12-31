// Import Modules
const mongoose = require('mongoose');
const chai = require('chai');
const chaiHttp = require('chai-http');

const server = require('../index.js');
const should = chai.should();

const {movie,user,reviews,characters} = require('../models');


chai.use(chaiHttp);

describe('home', ()=>{
  // before((done) =>{
  //   user.remove({}, (err) =>{
  //     done();
  //   });
  // });


  describe('/POST Search Bar', () =>{
    it('It should shown the movies based on the input', () => { //(done) => {
      chai.request(server)
        .post('/home/searchBar?page=1')
        .send({
          movieTitle:"Rush Hour"
        })
        .end((err,res) => {
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
          // done();
        })
    })
  })

  describe('/POST Search Bar', () =>{
    it('Page field must be a Number, Error',() => { //(done) => {
      chai.request(server)
        .post('/home/searchBar?page=as')
        .send({
          movieTitle:"Rush Hour"
        })
        .end((err,res) => {
          res.should.have.status(422);
          res.body.should.be.a('object');
          res.body.should.have.property('errors');
          // done();
        })
    })
  })

  describe('/POST Search Bar', () =>{
    it('Invalid movieTitle Input (include *), Error', () => { //(done) => {
      chai.request(server)
        .post('/home/searchBar?page=1')
        .send({
          movieTitle:"Rush*"
        })
        .end((err,res) => {
          res.should.have.status(422);
          res.body.should.be.a('object');
          res.body.should.have.property('errors');
          // done();
        })
    })
  })

  describe('/GET Caraousel Images', () => {
    it('it should get the latest 3 movie in dataset',() => { //(done) => {
      chai.request(server)
        .get('/home/carouselImages')
        .end((err,res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('result');
          res.body.result.should.be.a('array');
          // done()
        })
    })
  })

  describe('/GET Characters', () => {
    it('it should get random 15 characters in dataset', () => { //(done) => {
      chai.request(server)
        .get('/movie/characters')
        .end((err,res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('result');
          res.body.result.should.be.a('array');
          // done()
        })
    })
  })

  describe('/GET MovieInfo', () => {
    it('it should get the information of a movie', () => { //(done) => {
      const movieTitle = "Logan"
      const pageNumber = 1
      chai.request(server)
        .get('/movie/movieInfo/' + movieTitle + "?page=" + pageNumber)
        .end((err,res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('movieRating');
          res.body.movieRating.should.be.a('number');
          res.body.should.have.property('movieInfo');
          res.body.movieInfo.should.be.a('object');
          res.body.should.have.property('totalReviews');
          res.body.totalReviews.should.be.a('number');
          res.body.should.have.property('currrentPage');
          res.body.currrentPage.should.be.a('number');
          res.body.should.have.property('totalPage');
          res.body.totalPage.should.be.a('number');
          res.body.should.have.property('reviews');
          res.body.reviews.should.be.a('array');
          // done()
        })
    })
  })

  describe('/GET MovieInfo', () => {
    it('Movie not found, Error', () => { //(done) => {
      const movieTitle = "Loga"
      const pageNumber = 1
      chai.request(server)
        .get('/movie/movieInfo/' + movieTitle + "?page=" + pageNumber)
        .end((err,res) => {
          res.should.have.status(422);
          res.body.should.be.a('object');
          res.body.should.have.property('errors');
          // done();
        })
    })
  })

  describe('/GET MovieInfo', () => {
    it('Page Number error, Error',() => { //(done) => {
      const movieTitle = "Logan"
      const pageNumber = "as"
      chai.request(server)
        .get('/movie/movieInfo/' + movieTitle + "?page=" + pageNumber)
        .end((err,res) => {
          res.should.have.status(422);
          res.body.should.be.a('object');
          res.body.should.have.property('errors');
          // done();
        })
    })
  })

})
