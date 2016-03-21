const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

// Configure JWT Strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authentication'),
  secretOrKey: config.secret
};

// Create JWT Strategy
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
  // Check if user ID in payload exists in DB
  // If it does, call 'done' with that user
  // Otherwise, call 'done' without a user object
  User.findById(payload.sub, function(err, user) {
    if (err) { return done(err, false); }

    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  })
});

// Tell Passport to use this strategy
passport.use(jwtLogin);
