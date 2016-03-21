const jwt = require('jwt-simple');
const config = require('../config');
const User = require('../models/user');

// Generate a token for a given user
function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

exports.signin = function(req, res, next) {
  // At this point, user has already been authed via LocalStrategy,
  // just need to give them a token
  res.send({ token: tokenForUser(req.user) });
}

exports.signup = function(req, res, next) {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res.status(422).send({ error: 'You must provide both an email and a password'});
  }

  // Check if user with given email exists
  User.findOne({ email: email }, function(err, existingUser) {

    if (err) { return next(err); }

    // If user with email does exist, return error
    if (existingUser) {
      return res.status(422).send({ error: 'Email is already in use' });
    }

    // If user with email does not exist, create and save user record
    const user = new User({
      email: email,
      password: password
    });

    user.save(function(err) {
      if (err) { return next(err) };

      // Respond to request indicating user was created
      res.json({ token: tokenForUser(user) });
    });
  });
}
