const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const controllers = require("../controllers/UserController");

const jwtSecret = "SheIsJustAGirlWhoClaimsThatIAmTheOneButTheKidIsNotMySon";

router.route("/restaurants")
      .get(controllers.getAllRestaurant)

router.route("/:userId")
      .get(controllers.showDashboard)

router.route("/addtocart")
      .post(controllers.addToCart)
router.route("/getcart")
      .post(controllers.getCart) 


module.exports = router; 
