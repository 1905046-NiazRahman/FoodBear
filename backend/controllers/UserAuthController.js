const UserModel= require("../models/UserModel")
const bcrypt = require("bcryptjs")
const jwt=require("jsonwebtoken")
const jwtSecret="EverythinginthisworldisChaoticthereisnomeaningofLifewehavetojustcreateit"

const signupUser = async (req,res) =>{
    try {
        const user = await UserModel.findOne({email: req.body.email})

        const salt=await bcrypt.genSalt(10)
        const hashedPassword=await bcrypt.hash(req.body.password,salt)

        const newUser=await UserModel.create(
            {
                name: req.body.name,
                location: req.body.location,
                email : req.body.email,
                contact: req.body.contact,
                password: hashedPassword
            }
        )
        res.status(200).json(newUser)
    } catch (error) {
        console.log("User signing up failed")
        res.json({message:"User not created"})
    }
}

const loginUser = (req,res) =>{

}

module.exports= {
    loginUser,
    signupUser
}