// Import Modules
const express = require('express');
const router = express.Router();
const passport = require('passport');

// Import Middlewares and Controller
const auth = require('../middlewares/auth');
const UserController = require('../controllers/userController');
const userValidator = require('../middlewares/validators/userValidator');

// Signup Routes
router.post('/signup', [userValidator.signup, function (req, res, next) {
  passport.authenticate('signup', {
    session: false
  }, function (err, user, info) {
    // // This code can be commented
    // if (err) {
    //   return next(err);
    // }

    // Respond and show the error message
    if (!user) {
      res.status(401).json({
        status: 'Error',
        message: info.message
      });
      return;
    }
    // If no error, passed to Controller
    UserController.signup(user, req, res, next);
  }) (req, res, next);
}]);

// Login Routes
router.post('/login', [userValidator.login, function (req, res, next) {
  passport.authenticate('login', {
    session: false
  }, function (err, user, info) {
    // // This code can be commented
    // if (err) {
    //   return next(err);
    // }

    // Respond and show the error message
    if (!user) {
      res.status(401).json({
        status: 'Error',
        message: info.message
      });
      return;
    }
    // If no error, passed to Controller
    UserController.login(user, req, res, next);
  })(req, res, next);
}]);

// Get Profile Routes
router.get('/profile/:email', [userValidator.profile,  function(req,res,next) {
  passport.authenticate('profile', {
    session:false
  }, function (err,user,info) {
    if (!user) {
      res.status(401).json({
        status: 'Error',
        message: info.message
      });
      return;
    }
    UserController.profile(user,req,res,next);
  })(req,res,next);
}])

// Update Profile Routes
router.put('/profile/update/:email', [userValidator.update, function(req,res,next) {
  passport.authenticate('profile', {
    session:false
  }, function(err,user,info) {
    if (!user) {
      res.status(401).json({
        status: 'Error',
        message: info.message
      });
      return;
    }
    UserController.update(user,req,res,next);
  }) (req,res,next)
}])

// Add Movie Routes (Admin Account Only)
router.post('/addMovie', [passport.authenticate('admin', {
  session:false
}), userValidator.addMovie], UserController.addMovie)

// Get Reviews Routes
router.get('/profile/reviews/:email', [userValidator.profileReview, function(req,res,next) {
  passport.authenticate('profile', {
    session:false
  }, function(err,user,info) {
    if (!user) {
      res.status(401).json({
        status: 'Error',
        message: info.message
      });
      return;
    }
    UserController.userReviews(user,req,res,next);
  }) (req,res,next)
}])

// Add Review Routes
router.post('/review/:email', [userValidator.addReview, function(req,res,next) {
  passport.authenticate('profile', {
    session:false
  }, function(err,user,info) {
    if (!user) {
      res.status(401).json({
        status: 'Error',
        message: info.message
      });
      return;
    }
    UserController.addReview(user,req,res,next)
  }) (req,res,next)
}])

// Update Review Routes
router.put('/review/:email/:movie',[userValidator.updateReview, function(req,res,next) {
  passport.authenticate('profile', {
    session:false
  },function(err,user,info) {
    if (!user) {
      res.status(401).json({
        status: 'Error',
        message: info.message
      });
      return;
    }
    UserController.updateReview(user,req,res,next)
  }) (req,res,next)
}])

router.delete('/review/:email/:movie', [userValidator.deleteReview, function(req,res,next) {
  passport.authenticate('profile', {
    session:false
  }, function (err,user,info) {
    if (!user) {
      res.status(401).json({
        status: 'Error',
        message: info.message
      });
      return;
    }
    UserController.deleteReview(user,req,res,next)
  }) (req,res,next)
}])

module.exports = router;
