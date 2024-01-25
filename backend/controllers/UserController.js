const RestaurantModel = require("../models/RestaurantModel");
const FoodCategoryModel = require("../models/FoodCatagoryModel");
const FoodModel = require("../models/FoodModel");
const UserModel = require("../models/UserModel");
const DeliveryPersonModel = require("../models/DeliveryPersonModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtSecret =
  "EverythinginthisworldisChaoticthereisnomeaningofLifewehavetojustcreateit";


const showDashboard = async (req, res) => {
   const userId = req.params.userId
    try {
      const user = await UserModel.findById(userId)
  
      res.status(200).send(user);
    } catch (err) {
      console.log("error getting dashboard");
      res.status(404).json({
        success: false,
      });
    }
  };

const getAllRestaurant = async(req,res)=>{
  try {

      const restaurants=await RestaurantModel.find({})
      console.log(restaurants.length)
      res.send(restaurants)
  } catch (error) {
    console.log(error);
    return res.json({ success: false });
  }
}

module.exports = {
    showDashboard,
    getAllRestaurant
};