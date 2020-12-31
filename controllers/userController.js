// Import collection models
const {movie,user,review,characters,carouselImages} = require('../models')

// Import Modules
const passport = require('passport');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const _ = require('lodash')

// Create class
class UserController {

  // Signup function
  async signup(user, req, res) {
    // Decide the information kept in the token
    const body = {
      _id: user._id
    };

    // Create token
    const token = jwt.sign({
      user: body
    }, 'secret_password')//,{expiresIn:"10h"})

    res.status(200).json({
      message: 'Signup success!',
      token: token
    })
  }

  // Login function
  async login(user, req, res) {
    // Decide the information kept in the token
    const body = {
      _id: user._id
    };

    // Create token
    const token = jwt.sign({
      user: body
    }, 'secret_password')//, {expiresIn:"10h"})

    res.status(200).json({
      message: 'Login success!',
      token: token
    })
  }

  // Profile function
  async profile(err, req, res){
    //Find user from req.params.email and return it
    user.findOne({
      email:req.params.email
    }, {deleted:0,password:0,created_at:0,updated_at:0,_id:1})
    .then(r=>{
      res.json({
        status:'succes',
        data:r
      })
    })
  }

  // Profile update function
  async update(err, req, res){
    // Hash the input password
    const hash = bcrypt.hashSync(req.body.password, 10);

    // Update the Profile picture to review collection
    await review.updateMany({
      Email:req.params.email
    }, {
      Picture:req.file===undefined?null:req.file.filename
    })

    // Update the informatino of the account
    await user.findOneAndUpdate({
     email:req.params.email
   },{
     nama: req.body.nama,
     password: hash,
     picture: req.file===undefined?null:req.file.filename
   }).then(() =>{
     return user.findOne({
       email: req.params.email
     }, {deleted:0,password:0,created_at:0,updated_at:0,_id:1})
   }).then(result=>{
     res.json({
       status: "succes updating",
       data: result
     })
   })
  }

  // Add Movie Function
  async addMovie(req,res) {
    return movie.create({
      "Title":req.body.title,
      "Year":req.body.year,
      "Released":req.body.released,
      "Runtime":req.body.runtime,
      "Genre":req.body.genre,
      "Director":req.body.director,
      "Writer":req.body.writer,
      "Actors":req.body.actors,
      "Plot":req.body.plot,
      "Language":req.body.language,
      "Country":req.body.country,
      "Poster":req.body.poster,
      "Trailer":req.body.trailer
    }).then(()=>{
      return movie.findOne({
        Title:req.body.title,
        Year:req.body.year,
        Released:req.body.released
      },{deleted:0,password:0,created_at:0,updated_at:0,_id:1})
    }).then(result=>{
      res.json({
        status:'success add movie',
        data: result
      })
    })
  }

  // User reviews function
  async userReviews(err,req,res) {
    // Pagination constant
    const page = parseInt(req.query.page);
    const limit = 5;

    // Result of Query
    const totalResult =
      await review.find({Email:req.params.email})

    // Find all the reviews based on email
    const result = await review.find({Email:req.params.email}, {deleted:0,Email:0,created_at:0,updated_at:0,_id:1})
      .sort({updated_at:-1})

      console.log(result);
    // Number of movies found from the query
    const countResult = _.keys(totalResult);
    const totalPage = (countResult < limit) ? 1 : Math.ceil(countResult.length/limit)

    res.json({
      resultFound: countResult.length,
      currrentPage: page,
      totalPage : totalPage,
      results: result
    })
  }

  // Add review function
  async addReview(err,req,res) {
    // Find the
    const userName = await user.findOne({
      email:req.params.email
    })
    // Create new data in review collection
    return review.create({
      "Nama":userName.nama,
      "Picture":userName.picture.slice(5),
      "Email":req.params.email,
      "Movie":req.body.movie,
      "Review":req.body.review,
      "Rating":req.body.rating
    }).then(()=>{
      return review.findOne({
        Nama:userName.nama,
        Email:req.params.email,
        Movie:req.body.movie,
        Review:req.body.review,
        Rating:req.body.rating
      },{deleted:0,Email:0,created_at:0,updated_at:0,_id:1})
    }).then(result=>{
      res.json({
        status:'success reviewed movie',
        data: result
      })
    })
  }

  // Review update function
  async updateReview(err,req,res) {
    //Find the data of movie reviewed by the user and update it
    await review.findOneAndUpdate({
      Email:req.params.email,
      Movie:req.params.movie
    },{
      Review: req.body.review,
      Rating: req.body.rating
    }).then(() =>{
      return review.findOne({
        Email: req.params.email,
        Movie: req.params.movie
       }, {deleted:0,password:0,created_at:0,updated_at:0,_id:1})
    }).then(result=>{
     res.json({
       status: "succes updating",
       data: result
     })
   })
  }

  async deleteReview(err,req,res) {
    await review.delete({
      Email:req.params.email,
      Movie:req.params.movie
    }).then(result=>{
      res.json({
        status:"sucess",
        data:null
      })
    })
  }


}



module.exports = new UserController;
