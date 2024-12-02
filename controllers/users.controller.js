const users = require("../models/users.model");
const bookings = require("../models/users.model");

exports.Register = (req, res) => {
  if (!req.body) {
    res.status(404).json({ message: "Body empty" });
    return;
  }

  users
    .create(req.body)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error registering the user : err --> " + err.message,
      });
    });
};

// login
exports.login = (req, res) => {
  if (!req.body) {
    return res.status(404).send({ message: "Body not found!!" });
  }

  const { EmailId, Password } = req.body;
  const email = EmailId;
  const password = Password;

  const user = users
    .findOne({ EmailId })
    .then((data) => {
      if (!data) {
        return res
          .status(404)
          .send({ message: "User not found with email " + email });
      }
      if (Password === data.Password) {
        res.status(200).send({ message: "Login Successfull" });
      } else {
        res.status(401).send({ message: "Invalid Credentials !!!" });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Ann error occured : " + err.message });
    });
};
