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

const placeUserOrder = async(req,res)=>{
  received_food_items= []
  for(let i = 0; i < req.body.food_items.length; i++){
    received_food_items.push({
      food_id: req.body.food_items[i].id,
      quantity: req.body.food_items[i].quantity
    })
  }
  try {
    await OrderModel.create({
      user_id: req.body.user_id,
      restaurant_id: req.body.restaurant_id,
      food_items: received_food_items,
      total_price: req.body.total_price,
      payment_method: req.body.payment_method,
    });
    res.json({ message: "New order placed!" });
  } catch (error) {
    console.log(error);
    res.json({ message: "order not placed!" });
  }
}

module.exports={
    getFoods,
    placeUserOrder
}