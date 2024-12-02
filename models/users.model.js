const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  userid: {
    type: String,
    required: [true, "User id is required"],
    unique: [true, "User id already Exists"],
  },
  Name: {
    type: String,
    required: [true, "Name is required"],
    minlength: [6, "Name must have at least 6 characters"],
    maxlength: [20, "Name must have at most 20 characters"],
  },
  Address: {
    type: String,
    required: [true, "Address is required"],
  },
  EmailId: {
    type: String,
    required: [true, "Email is required"],
    validate: {
      validator: function (v) {
        // Regex to check if email contains '@'
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: (props) => `${props.value} is not a valid email address!`,
    },
    unique: [true, "email id should be uniques"],
  },
  PhoneNo: {
    type: Number,
    required: [true, "Phone number is required"],
  },
  Password: {
    type: String,
    required: [true, "Empty Password"],
  },
  UserBookings: {
    type: [String],
  },
});

module.exports = mongoose.model("users", userSchema);
