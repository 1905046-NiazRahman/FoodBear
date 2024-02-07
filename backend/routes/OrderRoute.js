const express = require("express")
const router = express.Router()
const controllers= require("../controllers/OrderController")
//user order portion
router.route("/user/orders/neworder")
      .post(controllers.placeUserOrder)
router.route("/user/orders/:userId")
      .get(controllers.getUserOrder)

//will be used in mycart
router.route("/user/food/:foodId")
      .get(controllers.getFoods)
//will be used in ordered foods
router.route("/user/foods")
      .get(controllers.getAllOrderedFoods)
//restaurant portion
router.route("/restaurant/orders/:restaurantId")
      .get(controllers.getSpecificRestaurantOrder)
router.route("/restaurant/deleteorder/:orderId")
      .delete(controllers.rejectOrder)
router.route("/restaurant/orders/confirmorder/:orderId/:deliverypersonId")
      .put(controllers.acceptOrder)

//delivery person portion
router.route("/deliveryperson/:deliverypersonId")
      .get()
router.route("/deliveryperson/orders/:deliverypersonId")
      .get(controllers.getAllOrderofSpecificDpPerson)
router.route("/deliveryperson/orders/pickeduporder/:orderId")
      .put(controllers.handlePickupOrder)
router.route("/deliveryperson/orders/deliveredorder/:orderId")
      .put(controllers.deliverOrder)

module.exports = router;