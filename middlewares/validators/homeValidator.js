// Import collection models
const {movie,user,review,characters,carouselImages} = require('../../models')

// Import Module for validations
const {check,validationResult,matchedData,sanitize} = require('express-validator')

module.exports= {
  // Searchbar valdiation
  searchBar: [
    check('movieTitle' , "Invalid Input!").custom(value=>{
      return !value.includes("*");
    }),
    check('page', 'Page field must be a Number').isNumeric(),
    (req,res,next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({
          errors:errors.mapped()
        })
      }
      next();
    }
  ],

}
