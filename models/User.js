var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
var userSchema = new Schema({
  // `title` is required and of type String
  username: {
    type: String,
    required: true
  },
  email: {
      type: String,
      required: true,
  },
  favorites: {
    type: Array,
    required: false
  },
});

// This creates our model from the above schema, using mongoose's model method
var User = mongoose.model("Users", userSchema);

// Export the Article model
module.exports = User;
