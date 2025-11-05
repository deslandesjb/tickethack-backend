var express = require("express");
var router = express.Router();

var moment = require("moment");

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
  const cityDeparture = req.body.departure[0].toUpperCase() + req.body.departure.slice(1).toLowerCase();
  const cityArrival = req.body.arrival[0].toUpperCase() + req.body.arrival.slice(1).toLowerCase();
  // let reqCityDate = new Date(req.body.date);
  // let reqCityDate = req.body.date;
  // console.log(cityDeparture, cityArrival, reqCityDate);
  // console.log(typeof reqCityDate);
  const reqCityDate = Date.parse(new Date(moment(req.body.date, "YYYY-MM-DD")));

  // console.log(reqCityDate);
  // console.log(typeof reqCityDate);
  //
  if (!cityDeparture || !cityArrival || !reqCityDate) {
    res.json({result: false, error: "Missing or empty fields"});
  } else {
    Trip.find({departure: cityDeparture, arrival: cityArrival}).then((data) => {
      if (data && data.length > 0) {
        let arr = [];
        for (let i = 0; i < data.length; i++) {
          // convert each data.date into number
          let dataDate = data[i].date;
          dataDate = Date.parse(dataDate);
          let dataDateEnd = reqCityDate + 86400000;
          // console.log(reqCityDate);
          if (reqCityDate <= dataDate && dataDate <= dataDateEnd) {
            arr.push(data[i]);
          }
        }

        res.json({result: true, trips: arr});
      } else {
        res.json({result: false, error: "Trips not found"});
      }
    });
  }
});

module.exports = router;
