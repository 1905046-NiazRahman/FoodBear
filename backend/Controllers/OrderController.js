const mongoose = require("mongoose");
const OrderModel= require("../models/OrderModel")
const FoodModel= require("../models/FoodModel")

const getFoods = async(req,res)=>{
    const foodId = req.params.foodId;
    try {
      //database theke data fetch kortesi
      const food = await FoodModel.findById(foodId);
  
      //backend theke frontend e data pathaitesi
      res.send(food);
    } catch (error) {
      console.log(error);
      return res.json({ success: false });
    }
}

module.exports={
    getFoods
}