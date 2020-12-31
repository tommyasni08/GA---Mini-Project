const {movie,user,review,characters,carouselImages} = require('../../models')
const {check,validationResult,matchedData,sanitize} = require('express-validator')

module.exports= {
  category: [
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
