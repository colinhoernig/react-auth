const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the user model
const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true
  },
  password: String
});

// Create the model class
const UserClass = mongoose.model('user', userSchema);

// Export so others can use
module.exports = UserClass;
