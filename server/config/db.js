const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const url = process.env.MONGO_URL;
const database = () => {
  mongoose
    .connect(url)
    .then(() => {
      console.log("db connected", mongoose.connection.host);
    })
    .catch((e) => {
      console.log(e);
    });
};

module.exports = database;
