// Import Model of collections
const {movie,user,review,characters,carouselImages} = require('../models')

// Import Module
const _ = require('lodash')

// Create MovieController class
class MovieController {

  // Characters function
  async characters(req,res) {
    // As the collection of characters used dummy data, there is no query required
    // Aggregation used to select random 15 data form the collection
    await characters.aggregate([
      {$project:{_id:1,deleted:0,created_at:0,updated_at:0}},
      {$sample:{size:15}}
    ])
    .then(result=>{
      res.json({
        result:result
      })
    })
  }

  // Movie info function
  async movieInfo(req,res) {
    // Pagination constant
    const page = parseInt(req.query.page);
    const limit = 5;

    // Result of Query
    const totalReviews =
      await review.find({
        Movie:req.params.movie
      })

    // Look for the reviews dataset in review collection
    const reviews = await review.find({
      Movie:req.params.movie
    },{Nama:1,Review:1,Rating:1,Picture:1})
    .skip((page - 1) * limit).limit(limit)
    .sort({"updated_at":-1})

    // Check the reviews dataset size
    const reviewsSize = _.size(totalReviews)
    const totalPage = (totalReviews < limit) ? 1 : Math.ceil(totalReviews.length/limit)

    // Create an empty variable for storing the operations inside the for loop
    let dummyRating = 0;

    // Foor loop operation to calculate the rating of the movie from the average of all reviews and stored it in the empty instance created before
    for(let i=0,rating =0;i<reviewsSize;i++) {
      rating = rating + totalReviews[i].Rating
      dummyRating = rating;
    }

    // Create the movieRating constant and stored the calculated rating inside
    const movieRating = Math.round(dummyRating/reviewsSize);

    // Update the rating of the movie
    await movie.findOneAndUpdate({
      Title:req.params.movie
    },{
      Rating:movieRating
    })

    // Collect the movie information :Details and reviews
    const movieInfo = await movie.findOne({
      Title:req.params.movie
    }, {deleted:0,_id:1,created_at:0,updated_at:0})

    res.json({
      movieRating: movieRating,
      movieInfo: movieInfo,
      totalReviews:reviewsSize,
      currrentPage: page,
      totalPage : totalPage,
      reviews: reviews
    })
  }
}

module.exports = new MovieController
