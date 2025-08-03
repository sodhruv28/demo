const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 8 },
  role: { type: String, default: "user" },
  firstname: { type: String, required: false },
  lastname: { type: String, required: false },
  address:{type: String, required: false},
  mobilenumber: { type: Number, required: false },
  resetPasswordToken: { type: String, required: false },
  resetPasswordExpires: { type: Date, required: false },

});

const User = mongoose.model("User", userSchema);

module.exports = User;
