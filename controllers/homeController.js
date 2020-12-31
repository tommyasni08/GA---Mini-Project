// Import collection models
const {movie,user,review,characters,carouselImages} = require('../models')

// Import Module
const _ = require('lodash')

// Create HomeController class
class HomeController {

  // Searchbar function
  async searchBar(req,res) {
    // Pagination constant
    const page = parseInt(req.query.page);
    const limit = 5;

    // Query constant
    const key = new RegExp (req.body.movieTitle, "i");
    const query = {"Title":key}

    // Result of Query
    const totalResult =
      await movie.find(query)

    // Result of findings
    const result =
      await movie.find(query, {_id:1,deleted:0,created_at:0,updated_at:0})
        .sort({"Year":-1,"updated_at":-1})
        .skip((page-1)*limit).limit(limit)

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

  // Carousel images function
  async carouselImages(req,res) {
    // Carousel Images find the 3 latest movie in the movie collection
    await carouselImages.find({},{Title:1,Poster:1,_id:1}).sort({"Year":-1,"updated_at":-1}).limit(3)
    .then(result=>{
      res.json({
        result:result
      })
    })
  }

}

module.exports = new HomeController
