// Import Module for validations
const {check,validationResult,matchedData,sanitize} = require('express-validator');

// Import collection models
const {movie,user,review,characters,carouselImages} = require('../../models')

module.exports = {
  // Movie info validation
  movieInfo:[
    check('page', 'Page field must be a Number').isNumeric(),
    check('movie').isString().exists().custom((value,{req})=>{
      return movie.findOne({
        Title:req.params.movie
      }).then(result=>{
        if (!result) {
          throw new Error("Movie Not Found")
        }
      })
    }),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({
          errors: errors.mapped()
        })
      }
      next();
    }
  ]

}
