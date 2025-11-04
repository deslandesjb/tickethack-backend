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

/* GET only trips filtered. */
router.get("/:cityDeparture", (req, res) => {
  Trip.find().then((data) => {
    res.json({trips: data});
  });
});
module.exports = router;
