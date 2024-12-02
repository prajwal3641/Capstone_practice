const mongoose = require("mongoose");

const bookingsSchema = mongoose.Schema({
  BookingId: {
    type: String,
    required: [true, "Booking id must not be null"],
    unique: [true, "Booking id must be unique"],
  },
  StartDate: {
    type: Date,
    required: [true, "Start date cannot be empty"],
  },
  EndDate: {
    type: Date,
    required: [true, "End data cannot be empty"],
  },
  NoOfPersons: {
    type: Number,
  },
  NoOfRooms: Number,
  TypeOfRoom: {
    type: String,
    required: [true, "Type of room cannot be empty"],
  },
});

module.exports = mongoose.model("bookings", bookingsSchema);
