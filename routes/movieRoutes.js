// Import Modules
const express = require('express')
const router = express.Router()

//Import Validator and Controller
const MovieController = require('../controllers/movieController.js')
const movieValidator = require('../middlewares/validators/movieValidator.js')

// Movie Characters Routes
router.get('/characters', MovieController.characters)

// Movie Infor Routes (Movie Info and Reviews)
router.get('/movieInfo/:movie', movieValidator.movieInfo, MovieController.movieInfo)


module.exports = router;
