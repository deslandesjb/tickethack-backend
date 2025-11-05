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

//petite maj pour supprimer un trajet du panier 👍 
/* DELETE a trip de cart normalement..  */
router.delete("/:cartId", (req, res) => {
  const cartId = req.params.cartId;
  
  Cart.findByIdAndDelete(cartId)
    .then((deletedCart) => {
      if (deletedCart) {
        res.json({ result: true, message: "Trip removed from cart" });
      } else {
        res.json({ result: false, error: "Cart item not found" });
      }
    })
    .catch(error => {
      res.json({ result: false, error: error.message });
    });
});
//console.log(cart.findByIdAndDelete(cartId))

/*le backend c'est vraiment trop galere quand tu ne sais pas quoi faire vraiment j'ai du reviser tout le cour dessus  😂*/



// -------------------------------------
router.delete("/", (req, res) => {
  const tripId = req.body.tripId;
  //
  if (!tripId) {
    res.json({result: false, error: "Missing or empty fields"});
  } else {
    Trip.deleteOne({_id: tripId}).then((data) => res.json({allTrips: data}));

    // Trip.deleteMany().then((data) => res.json({allTrips: data}));
  }
});

// -------------------------------------
// Cart.find({trips: tripId}).then((data) => {
//   console.log(data);
// });

module.exports = router;
