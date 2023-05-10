const mongoose = require("mongoose");

const connectDb = () => {
  mongoose.connect(process.env.DB_CONNECTION).then(() => {
    console.log("connected to db");
  });
};

module.exports = connectDb;
