const mongoose = require("mongoose");

const connectionString = "mongodb+srv://admin:4aOH4utY2gJM6q4H@cluster0.tmgtwyi.mongodb.net/tickethack";

mongoose
  .connect(connectionString, {connectTimeoutMS: 2000})
  .then(() => console.log("Connected"))
  .catch((error) => console.error(error));

module.exports = connectionString;
