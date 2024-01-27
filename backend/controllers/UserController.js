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

const addToCart = async (req,res) => {
  const userId = req.params.userId;
  try {

    const user = await UserModel.findById(userId);

    //console.log(user._id);
    

    if(req.body.food_id==null){
      console.log("food not found");
    }
    await CartModel.create({
      user_id: req.body.user_id,
      food_id: req.body.food_id,
      restaurant_id: req.body.restaurant_id
    })
    res.json({ message: "Food added to cart!!" });
  }
  catch (error) {
    console.log("error add to card");
    res.status(404).json({
      success: false,
    });
  }
} 

const getCart = async (req,res) => {
  const userId = req.body.user_id;
  try {
    const cart = await CartModel.find({userId});
    res.json(cart);

  } catch (error) {
    console.log("error get card");
    res.status(404).json({
      success: false,
    });
    
  }
}

module.exports = {
    showDashboard,
    getAllRestaurant,
    addToCart,
    getCart
};