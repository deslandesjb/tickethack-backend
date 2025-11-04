var express = require("express");
var router = express.Router();

// const trip = require("./trips");
// const fetch = require('node-fetch');
const Trip = require("../models/trips");

/* GET trips listing. */
router.get("/", (req, res) => {
  Trip.find().then((data) => {
    res.json({trips: data});
  });
});

/* GET only trips filtered. */
router.post("/", (req, res) => {
  const cityDeparture = req.body.departure;
  const cityArrival = req.body.arrival;
  let reqCityDate = new Date(req.body.date);
  reqCityDate = Date.parse(reqCityDate);
  if (!cityDeparture || !cityArrival || !reqCityDate) {
    res.json({result: false, error: "Missing or empty fields"});
  } else {
    Trip.find({departure: cityDeparture, arrival: cityArrival}).then((data) => {
      if (data) {
        let arr = [];
        for (let i = 0; i < data.length; i++) {
          // convert each data.date into number
          let dataDate = data[i].date;
          dataDate = Date.parse(dataDate);
          if (reqCityDate <= dataDate) {
            arr.push(data[i]);
          }
        }

        res.json({trips: arr});
      } else {
        res.json({result: false, error: "Trips not found"});
      }
    });
  }
});

module.exports = router;
