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
        const date = Date.now();
        const filteredData = [];
        for (let i = 0; i < data.length; i++) {
          // console.log(date);
          // console.log(data.length);
          const dateToNum = Number(data[i].date);
          // console.log(dateToNum);
          if (date < dateToNum) {
            console.log("if", data[i]);
            filteredData.push(data[i]);
            res.json({trips: filteredData});
          }
        }
      } else {
        res.json({result: false, error: "Trips not found"});
      }
    });
  }
});

module.exports = router;
