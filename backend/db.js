const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://shubham1bcabnc18:jIvA7RnaWyg83VSx@cluster0.ac6ncn2.mongodb.net/Paytm"
);

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowerCase: true,
    minLength: 3,
    maxLength: 30,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50,
  },
});
const User = mongoose.model("User", UserSchema);

module.exports = {
  User,
};
