// Import Modules
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

// Import user model
const {
  user
} = require('../../models');

// Signup Authentication
passport.use(
  'signup',
  new localStrategy({
      usernameField: 'email',
      passwordField: 'password',
      // PassReqToCallback because there is other variable like Nama
      passReqToCallback: true
    },
    // pass the variable email and password
    async (req, email, password, done) => {
      // Hash Password using bcrypt
      const hash = bcrypt.hashSync(password, 10);
      // Create new user data
      user.create({
        email: email,
        password: hash,
        nama: req.body.nama,
      }).then(user => {
        // Pass the user and error message
        return done(null, user, {
          message: 'Signup success!'
        });
      }).catch(err => {
        if (err) {
          // Check if nama already exists or not
          if (err.code === 11000 && err.keyValue.nama) {
            return done(null, false, {
              message: 'Name already used!'
            })
            // Check if email already exists or not
          } else if (err.code === 11000 && err.keyValue.email) {
            return done(null, false, {
              message: 'Email already used!'
            })
          }
          // // These code can be commented
          // return done(null, false, {
          //     message: 'User failed to created!'
          // })
        }
      })
    },
  )
)

// Login Authentication
passport.use(
  'login',
  new localStrategy({
      usernameField: 'email',
      passwordField: 'password'
      // Dont need PassReqToCallback because only variable email and password is passed
    },
    async (email, password, done) => {
      const userLogin = await user.findOne({
        email: email
      })
      // Check if user exists with the email
      if (!userLogin) {
        return done(null, false, {
          message: 'User not found!'
        })
      }

      const validate = await bcrypt.compare(password, userLogin.password);

      // Check if the password inputted same as the one kept in database
      if (!validate) {
        return done(null, false, {
          message: 'Wrong password!'
        })
      }

      // If no error pass the user information found with the email
      return done(null, userLogin, {
        message: 'Login success!'
      })
    }
  )
)

// Account/Profile Authentication
passport.use(
  'profile',
  new JWTstrategy({
      secretOrKey: 'secret_password', // key for jwt
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(), // extract token from authorization
      passReqToCallback: true
    },
    async (req, token, done) => {
      // Find user with params.email
      const userLogin = await user.findOne({
        email:req.params.email
      })

      if (!userLogin) {
        return done(null,false,{
          message: "User not found"
        })
      }
      // Check is _id in token same as the params.email user
      if (userLogin._id == token.user._id) {
        return done(null, userLogin, {} )
      }

      return done(null, false, {
        message:"Invalid Token!"
      })
    }
  )
)

passport.use(
  'admin',
  new JWTstrategy({
      secretOrKey: 'secret_password', // key for jwt
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken() // extract token from authorization
    },
    async (token, done) => {
      // Find user depend on token.user._id
      const userLogin = await user.findOne({
        _id: token.user._id
      })

      const adminEmail = await user.findOne({
        nama: "admin"
      })

      // Check if the _id in token same as the _id in Admin account
      if (String(userLogin._id) == String(adminEmail._id)) {
        return done(null, userLogin)
      }

      return done(null, false)
    }
  )
)
