// Import collection models
const {movie,user,review,characters,carouselImages} = require('../models')

// Import Module
const _ = require('lodash')

// Create Category Controller class
class CategoryController {
  async action(req,res) {
    // Pagination constant
    const page = parseInt(req.query.page);
    const limit = 15;

    // Query constant
    const key = new RegExp ("Action")
    const query = {"Genre":key}

    // Result of Query
    const totalResult =
      await movie.find(query)

    const result =
      await movie.find(query,{_id:1,Poster:1,Title:1,Genre:1})
        .skip((page - 1) * limit).limit(limit)
        .sort({"Year":-1})

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

  async comedy(req,res) {
    // Pagination constant
    const page = parseInt(req.query.page);
    const limit = 15;

    // Query constant
    const key = new RegExp ("Comedy")
    const query = {"Genre":key}

    // Result of Query
    const totalResult =
      await movie.find(query)

    const result =
      await movie.find(query,{_id:1,Poster:1,Title:1,Genre:1})
        .skip((page - 1) * limit).limit(limit)
        .sort({"Year":-1})

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

  async drama(req,res) {
    // Pagination constant
    const page = parseInt(req.query.page);
    const limit = 15;

    // Query constant
    const key = new RegExp ("Drama")
    const query = {"Genre":key}

    // Result of Query
    const totalResult =
      await movie.find(query)

    const result =
      await movie.find(query,{_id:1,Poster:1,Title:1,Genre:1})
        .skip((page - 1) * limit).limit(limit)
        .sort({"Year":-1})

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

  async animation(req,res) {
    // Pagination constant
    const page = parseInt(req.query.page);
    const limit = 15;

    // Query constant
    const key = new RegExp ("Animation")
    const query = {"Genre":key}

    // Result of Query
    const totalResult =
      await movie.find(query)

    const result =
      await movie.find(query,{_id:1,Poster:1,Title:1,Genre:1})
        .skip((page - 1) * limit).limit(limit)
        .sort({"Year":-1})

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

  async biography(req,res) {
    // Pagination constant
    const page = parseInt(req.query.page);
    const limit = 15;

    // Query constant
    const key = new RegExp ("Biography")
    const query = {"Genre":key}

    // Result of Query
    const totalResult =
      await movie.find(query)

    const result =
      await movie.find(query,{_id:1,Poster:1,Title:1,Genre:1})
        .skip((page - 1) * limit).limit(limit)
        .sort({"Year":-1})

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

  async category(req,res) {
    // Pagination constant
    const page = parseInt(req.query.page);
    const limit = 15;

    // Query constant
    const key = new RegExp (req.body.category, "i");
    const query = {"Genre":key}

    // Result of Query
    const totalResult =
      await movie.find(query)

    const result =
      await movie.find(query, {_id:1,Poster:1,Title:1,Genre:1})
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

  async categoryAll(req,res) {
    // Pagination constant
    const page = parseInt(req.query.page);
    const limit = 15;

    // Result of Query
    const totalResult =
      await movie.find({})

    const result =
      await movie.find({}, {_id:1,Poster:1,Title:1,Genre:1})
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
}

module.exports = new CategoryController
