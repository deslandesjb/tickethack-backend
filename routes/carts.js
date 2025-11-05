var express = require("express");
var router = express.Router();
const Cart = require("../models/carts");
const Trip = require("../models/trips");

router.get("/", (req, res) => {
  Cart.find()
    .populate("trips")
    .then((data) => {
      if (data && data.length > 0) {
        // const myCart = [];
        // for (let i = 0; i < data.length; i++) {
        //   myCart.push(data[i].trips);
        // }
        res.json({result: true, trips: data});
      } else {
        res.json({result: false});
      }
    });
});

/* GET only trips filtered. */
router.post("/", (req, res) => {
  const tripId = req.body.tripId;
  //
  if (!tripId) {
    res.json({result: false, error: "Missing or empty fields"});
  } else {
    Trip.find({_id: tripId}).then((data) => {
      if (data && data.length > 0) {
        // console.log("test");
        // console.log(data);
        const newCartTrip = new Cart({
          trips: tripId,
          // total: 1
        });
        newCartTrip.save().then((newTrip) => {
          res.json({result: true, trips: newTrip});
        });
      } else {
        res.json({result: false, error: "Trips not found"});
      }
    });
  }
});

// -------------------------------------
router.delete("/:cartId", (req, res) => {
  const cartId = req.params.cartId;
  //
  if (!cartId) {
    res.json({result: false, error: "Missing or empty fields"});
  } else {
    Cart.find({_id: cartId}).then((data) => {
      // console.log(cartId);
      // Cart.deleteOne();
      // const index = Trip.findIndex((e) => e._id === cartId);
      // console.log(index);
      if (data && data.length > 0) {
        Cart.deleteOne({_id: cartId}).then((data) => {
          res.json({result: true, error: "Trip deleted"});
        });
      } else {
        res.json({result: false, error: "Trip unfounded"});
      }
    });
  }
});

// -------------------------------------
// Cart.find({trips: tripId}).then((data) => {
//   console.log(data);
// });

module.exports = router;
