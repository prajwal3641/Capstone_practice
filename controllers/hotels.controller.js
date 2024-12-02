const hotels = require("../models/hotels.model");
// get all hotels
exports.getAllHotels = (req, res) => {
  hotels
    .find()
    .then((data) => {
      if (!data) {
        return res.status(404).send({ message: "Data not found for hotels" });
      }
      res.status(200).send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error while loading the data :-> " + err.message });
    });
};

exports.getReviews = (req, res) => {
  const { HotelName } = req.params;

  hotels
    .findOne({ HotelName })
    .then((data) => {
      if (!data) {
        return res.status(404).send({ message: "Hotl not found" });
      }
      res.send(data.Reviews);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "error getting the reviews ==> " + err.message });
    });
};
