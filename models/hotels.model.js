const mongoose = require("mongoose");

const hotelSchema = mongoose.Schema({
  HotelName: {
    type: String,
    required: [true, "Hotel name cannot be empty"],
  },
  Description: {
    type: String,
  },
  Amenities: {
    type: String,
  },
  PhoneNo: {
    type: String,
    required: [true, "Phone number cannot be null"],
  },
  Address: {
    type: String,
    required: [true, "Address cannot be null"],
  },
  Reviews: {
    type: [String],
  },
});

module.exports = mongoose.model("hotels", hotelSchema);
