const bookings = require("../models/bookings.model");
const users = require("../models/users.model");

exports.bookAHotel = (req, res) => {
  if (!req.body) {
    return res.status(404).send({ message: "Body is empty guys" });
  }

  const { userid, hotelName } = req.params;

  users
    .findOne({ userid })
    .then((userData) => {
      if (!userData) {
        return res
          .status(404)
          .send({ message: "User not found for Id:-> " + userId });
      }

      // book the booking
      bookings
        .create(req.body)
        .then((bookData) => {
          users
            .updateOne(
              {
                userid: userid,
              },
              { $push: { UserBookings: bookData.BookingId } }
            )
            .then(() =>
              res.status(200).send("Booking successfull and added to user !")
            )
            .catch((err) => {
              res
                .status(500)
                .send("error saving booking to user --> " + err.message);
            });
        })
        .catch((err) => {
          res
            .status(500)
            .send({ message: "Error creating booking --> " + err.message });
        });
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error creating the booking :--> " + err.message });
    });
};

// update the booking

exports.updateBooking = (req, res) => {
  if (!req.body) {
    return res.status(404).send({ message: "Body is empty guys" });
  }

  const { userid } = req.params;

  const bookingId = req.body.BookingId; // The BookingId you want to find
  const updatedData = {
    StartDate: req.body.StartDate, // New start date
    EndDate: req.body.EndDate, // New end date
  };

  users
    .findOne({ userid })
    .then((userData) => {
      if (!userData) {
        return res
          .status(404)
          .send({ message: "User not found for Id:-> " + userId });
      }
      bookings
        .findOneAndUpdate(
          { BookingId: bookingId }, // Find the booking by BookingId
          { $set: updatedData }, // Update only StartDate and EndDate
          { new: true } // Return the updated document
        )
        .then((updatedBooking) => {
          res.send(updatedBooking);
        })
        .catch((err) => {
          res
            .status(500)
            .send({ message: "error updating : -- > " + err.message });
        });
    })
    .catch((err) => {
      res.send({ message: "Error -->" + err.message });
    });
};

exports.deleteBooking = (req, res) => {
  const { userid, BookingId } = req.params;

  users
    .findOneAndUpdate(
      { userid: userid },
      { $pull: { UserBookings: BookingId } },
      { new: true }
    )
    .then((updatedUser) => {
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }
      bookings
        .findOneAndDelete({ BookingId: BookingId })
        .then((deletedBooking) => {
          if (!deletedBooking) {
            return res.status(404).json({ message: "Booking not found" });
          }

          // Step 3: Return a success response
          res.status(200).json({
            message: `Booking ${BookingId} has been successfully deleted.`,
            userBookings: updatedUser.UserBookings, // Send back the updated UserBookings array
          });
        });
    })

    .catch((error) => {
      console.error("Error deleting booking:", error);
      return res.status(500).json({ message: "Internal server error" });
    });
};

exports.getBookingById = (req, res) => {
  const { BookingId } = req.params;

  bookings
    .findOne({ BookingId })
    .then((data) => {
      if (!data) {
        return res
          .status(404)
          .send({ message: "Booking not found for id :-> " + BookingId });
      }

      res.send(data);
    })
    .catch((err) => {
      res.send({ message: "Error :-> " + err.message });
    });
};
