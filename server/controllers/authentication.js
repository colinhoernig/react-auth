const User = require('../models/user');

exports.signup = function(req, res, next) {
  const email = req.body.email;
  const password = req.body.password;

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
      res.json({ success: true });
    });
  });

}
