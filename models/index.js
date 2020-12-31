// Import modules
const mongoose = require('mongoose')

// MongoDB connection URI
const uri = 'mongodb://localhost:27017/Mini_Project_dev'

// Connecting to the NOSql database
mongoose.connect(uri,{useUnifiedTopology:true,useNewUrlParser:true, useCreateIndex:true});

// Import the model of each collection
const movie = require('./movie.js')
const user = require('./user.js')
const review = require('./review.js')
const characters = require('./characters.js')
const carauselImages = require('./carouselImages.js')

// Export the model of each collection
module.exports = {movie,user,review,characters,carouselImages}
