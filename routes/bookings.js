var express = require("express");
var router = express.Router();
const Booking = require("../models/bookings");
const Cart = require("../models/carts");
const Trip = require("../models/trips");
//console.log(Trip);

router.get("/", (req, res) => {
  Booking.find()
    .populate("trips")
    .then((data) => {
      if (data && data.length > 0) {
        //en esperant que sa fonctionne correctement ; )

        const bookingsWithTimeRemaining = data.map((booking) => {
          const tripsWithTime = booking.trips.map((trip) => {
            const now = new Date();
            const departureTime = new Date(trip.date);
            const timeRemainingMs = departureTime - now;
            const hoursRemaining = Math.floor(timeRemainingMs / (1000 * 60 * 60));

            return {
              ...trip.toObject(),
              timeRemaining: hoursRemaining > 0 ? hoursRemaining : 0,
              hasDeparted: timeRemainingMs < 0,
            };
          });

          return {
            ...booking.toObject(),
            trips: tripsWithTime,
          };
        });

        res.json({result: true, bookings: bookingsWithTimeRemaining});
      } else {
        res.json({result: false, message: "No bookings found"});
      }
    })
    .catch((error) => {
      res.json({result: false, error: error.message});
    });
});

/* POST - acheter un item cart et creer un booking */
router.post("/purchase", async (req, res) => {
  try {
    // Récupérer tous les items du panier
    const cartItems = await Cart.find().populate("trips");

    if (!cartItems || cartItems.length === 0) {
      return res.json({result: false, error: "Cart is empty"});
    }

    //---------------------
    const allTripIds = [];
    let totalPrice = 0;

    cartItems.forEach((cartItem) => {
      cartItem.trips.forEach((trip) => {
        allTripIds.push(trip._id);
        totalPrice += trip.price || 0;
      });
    });

    //console.log(allTripIds)
    //------------------------
    // Créer une nouvelle réservation avec tous les trajets
    const newBooking = new Booking({
      trips: allTripIds,
      totalPrice: totalPrice,
      purchaseDate: new Date(),
    });

    await newBooking.save();

    // Vider le panier
    await Cart.deleteMany({});

    res.json({
      result: true,
      booking: newBooking,
      message: "Purchase successful",
    });
  } catch (error) {
    res.json({result: false, error: error.message});
  }
});

module.exports = router;
