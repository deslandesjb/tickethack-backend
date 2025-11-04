const mongoose = require("mongoose");

const trip = mongoose.Schema({
  departure: String,
  arrival: String,
  date: Object,
  price: Number,
});

const Trip = mongoose.model("trips", trip);
module.exports = Trip;
