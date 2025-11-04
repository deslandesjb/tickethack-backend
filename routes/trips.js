var express = require("express");
var router = express.Router();

// const trip = require("./trips");
// const fetch = require('node-fetch');
const Trip = require("../models/trips");

/* GET trips listing. */
router.get("/", (req, res) => {
  Trip.find().then((data) => {
    // console.log(typeof data[0].date); // object
    res.json({trips: data});
  });
});

const date = Date.now();
console.log(date);
console.log(typeof date);

/* GET only trips filtered. */
router.post("/", (req, res) => {
  const cityDeparture = req.body.departure;
  const cityArrival = req.body.arrival;
  if (!cityDeparture || !cityArrival) {
    res.json({result: false, error: "Missing or empty fields"});
  } else {
    Trip.find({departure: cityDeparture, arrival: cityArrival}).then((data) => {
      const date = Date.now();
      console.log(date);
      if (data) {
        console.log(data[0].date);
        console.log(typeof data[0].date);
        res.json({trips: data});
      } else {
        res.json({result: false, error: "Trips not found"});
      }
    });
  }
});

module.exports = router;
