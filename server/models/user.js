const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

// Define the user model
const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true
  },
  password: String
});

// Encrypt password on save hook
userSchema.pre('save', function(next) {
  // Get access to the user model context
  const user = this;

  // Generate a salt, then run callback
  bcrypt.genSalt(10, function(err, salt) {
    if (err) { return next(err); }

    // Encrypt our password using the salt
    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) { return next(err); }

      // Overwrite plain-text password with encrypted password
      user.password = hash;
      next();
    });
  });
});

// Create the model class
const UserClass = mongoose.model('user', userSchema);

// Export so others can use
module.exports = UserClass;
