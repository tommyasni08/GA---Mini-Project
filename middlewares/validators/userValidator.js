// Import Module for validations
const {check,validationResult,matchedData,sanitize} = require('express-validator');

// Import collection models
const {movie,user,review,characters,carouselImages} = require('../../models')

// Import Modules for file uploads
const multer = require('multer'); //multipar form-data
const path = require('path'); // to detect path of directory
const crypto = require('crypto'); // to encrypt something

// Setup the path and name of file uploaded
const uploadDir = '/img/'; // make images upload to /img/
const storage = multer.diskStorage({
  destination: "./public" + uploadDir, // make images upload to /public/img/
  filename: function (req, file, cb) {
    // crypto.pseudoRandomBytes(16, function (err, raw) {
    //   if (err) return cb(err)
    //
    //   cb(null, raw.toString('hex') + path.extname(file.originalname)) // encrypt filename and save it into the /public/img/ directory
    // })
    cb(null,req.body.nama+"_picture"+ path.extname(file.originalname))
  }
})

// Create constraint (filetype and filesize) for the file uploaded
const upload = multer({
  storage: storage,
  limits:{fileSize:1000000},
  fileFilter:function(req,file,cb){
    checkFileType(file,cb)
  },
  dest: uploadDir
});

function checkFileType(file,cb) {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);
  if(mimetype && extname){
    return cb(null,true)
  } else {
    cb('Error, Please Upload Image File Only!')
  }
}

module.exports = {
  // Signup validation
  signup: [
    check('nama').exists().custom(value=>{
      return user.findOne({
        nama:value
      }).then(result=>{
        if (result) {
          throw new Error('Nama already used!')
        }
      })
    }),
    check('email', 'email field must be email address').normalizeEmail().isEmail().custom(value=>{
      return user.findOne({
        email:value
      }).then(result=>{
        if (result) {
          throw new Error('Email already used!')
        }
      })
    }),
    check('password', 'password field must have 8 to 32 characters').isString().isLength({
      min: 8,
      max: 32
    }),
    check('passwordConfirmation', 'passwordConfirmation field must have the same value as the password field')
    .exists()
    .custom((value, {req}) => value === req.body.password),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({
          errors: errors.mapped()
        });
      }
      next();
    }
  ],

  // Login validation
  login: [
    check('email', 'email field must be email address').normalizeEmail().isEmail(),
    check('password', 'password field must have 8 to 32 characters').isString().isLength({min: 8, max: 32}),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({
          errors: errors.mapped()
        });
      }
      next();
    }
  ],

  // Profile validation
  profile: [
    // check('id').custom(value => {
    //   return user.findById(value).then(u => {
    //     if (!u) {
    //       throw new Error('User not found!')
    //     }
    //   })
    // }),
    check('email').normalizeEmail().isEmail().custom((value,{req})=>{
      return user.find({
        email:req.params.email
      }).then(result=>{
        if (!result) {
          throw new Error('User not found!')
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
  ],

  // Update profile validation
  update: [
    upload.single('picture'),
    // check('id').custom(value => {
    //   return user.findById(value).then(u => {
    //     if (!u) {
    //       throw new Error('User not found!')
    //     }
    //   })
    // }),
    check('email').normalizeEmail().isEmail()
    .custom((value,{req})=>{
      return user.findOne({
        email:req.params.email
      }).then(result=>{
        if (!result) {
          throw new Error('User not found!')
        }
      })
    }),
    check('nama').isString().custom((value,{req})=>{
      return user.findOne({
        email:req.params.email
      }).then(result=>{
        if(result.nama !== value) {
          return user.findOne({
            nama:value
          }).then(result=>{
            if (result) {
              throw new Error ("Nama Already Used!")
            }
          })
        }
      })
    }),
    check('password', 'password field must have 8 to 32 characters').isString().isLength({
      min: 8,
      max: 32
    }),
    check('passwordConfirmation', 'passwordConfirmation field must have the same value as the password field')
    .exists()
    .custom((value, {
      req
    }) => value === req.body.password),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({
          errors: errors.mapped()
        })
      }
      next();
    }
  ],

  // Add movie (Admin Acc Only) validation
  addMovie: [
    check('title').isString().exists(),
    check('year', "Year Format (YYYY) Only!").isNumeric().exists(),
    check('released',"Date Format (YYYY-MM-DD) Only").isDate().exists(),
    check('runtime').isString().exists(),
    check('genre').isString().exists(),
    // .custom(value=>{
    //   function doubleQuote(str) {
    //     return '"'+str+'"';
    //   }
    //
    //   const strValue = value.split(", ").map(doubleQuote).toString();
    //   console.log(strValue);
    //   console.log(typeof strValue);
    //   const catList = ["Action","Comedy","Drama","Animation","Biography","Adventure","Horror","Crime","Documentary","Family","Thriller","Mystery","Sci-Fi","Fantasy","Romance","Western","Music","History","Film-Noir","War","Musical","Sport","Game-Show","News","Reality-Tv"]
    //   console.log(catList.includes(strValue));
    //   if (!catList.includes(value)) {
    //     throw new Error('Invalid type of Genre')
    //   }
    // }),
    check('director').isString(),
    check('writer').isString(),
    check('actors').isString().exists(),
    check('plot').isString().exists(),
    check('language').isString().exists(),
    check('country').isString().exists(),
    check('poster', "URL Input Only").isURL(),
    check('trailer', "URL Input Only").isURL(),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({
          errors: errors.mapped()
        })
      }
      next();
    }
  ],


  // Profile review validation
  profileReview: [
    // check('id').custom(value => {
    //   return user.findById(value).then(u => {
    //     if (!u) {
    //       throw new Error('User not found!')
    //     }
    //   })
    // }),
    check('page', 'Page field must be a Number').isNumeric(),
    check('email').normalizeEmail().isEmail().custom((value,{req})=>{
      return user.find({
        email:req.params.email
      }).then(result=>{
        if (!result) {
          throw new Error('User not found!')
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
  ],

  // Add review validation
  addReview:[
    check('movie').isString().exists().custom(value=>{
      return movie.findOne({
        Title:value
      }).then(result=>{
        if (!result) {
          throw new Error("Movie Not Found")
        }
      })
    }).custom((value,{req})=>{
      return review.findOne({
        // Movie:value,
        Email:req.params.email.toLowerCase()
      })
      .then(result=>{
        if (result) {
          throw new Error("This movie has been reviewed by you")
        }
      })
    }),
    check('email').normalizeEmail().isEmail()
    .custom((value,{req})=>{
      return user.findOne({
        email:req.params.email
      }).then(result=>{
        if (!result) {
          throw new Error('User not found!')
        }
      })
    }),
    check('review', "Must be filled").notEmpty(),
    check('rating', '0-10 Only!').isInt({max:10,min:0}),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({
          errors: errors.mapped()
        })
      }
      next();
    }
  ],

  // Update review validation
  updateReview:[
    check('movie').isString().exists().custom((value,{req})=>{
      return review.findOne({
        Movie:req.params.movie
      }).then(result=>{
        if (!result) {
          throw new Error("Movie Not Found or Have not been reviewed")
        }
      })
    }),
    check('email').normalizeEmail().isEmail()
    .custom((value,{req})=>{
      return user.findOne({
        email:req.params.email
      }).then(result=>{
        if (!result) {
          throw new Error('User not found!')
        }
      })
    }),
    check('review', "Must be filled").notEmpty(),
    check('rating', '0-10 Only!').isInt({max:10,min:0}),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({
          errors: errors.mapped()
        })
      }
      next();
    }
  ],

  deleteReview : [
    check('movie').isString().exists().custom((value,{req})=>{
      return review.findOne({
        Movie:req.params.movie
      }).then(result=>{
        if (!result) {
          throw new Error("Movie Not Found or Have not been reviewed")
        }
      })
    }),
    check('email').normalizeEmail().isEmail()
    .custom((value,{req})=>{
      return user.findOne({
        email:req.params.email
      }).then(result=>{
        if (!result) {
          throw new Error('User not found!')
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
};
