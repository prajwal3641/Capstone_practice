module.exports = (app) => {
  const UserController = require("../controllers/users.controller");
  const HotelController = require("../controllers/hotels.controller");
  const BookingController = require("../controllers/bookings.controller");

  app.post("/register", UserController.Register);
  app.post("/login", UserController.login);
  app.get("/hotels", HotelController.getAllHotels);
  app.post("/bookings/:userid/:hotelName", BookingController.bookAHotel);
  app.put("/bookings/:userid", BookingController.updateBooking);
  app.delete("/bookings/:userid/:BookingId", BookingController.deleteBooking);
  app.get("/bookings/:BookingId", BookingController.getBookingById);
  app.get("/reviews/:HotelName", HotelController.getReviews);
};
