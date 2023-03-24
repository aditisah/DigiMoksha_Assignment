const userModel = require("../models/userModel")
const jwt = require("jsonwebtoken")
const signUp = async (req, res)=>{
    try{
        const {userName, password, confirmPassword} = req.body
    const userDetail = await userModel.create(req.body)
    res.status(201).send({status: true, data: userDetail})
    }catch(err){
        res.status(500).send({status:false, message: err.message})
    }
}

const logIn = async (req, res)=>{
    try{
        const {email, password} = req.body
        const user = await userModel.findOne({email})
        if(!user){
            return res.status(400).send({status: false,message: "please give correct credentials!!"})
        }
        const token = jwt.sign({id: user._id},'SECRET-KEY')
        res.setHeader("Authorization", token)
        res.status(200).send({status: true, message: 'You are successfully loggedin!!', data: {userId:user._id,token}})
    }catch(err){
        res.status(500).send({status: false, message: err.message})
    }
}

module.exports.signUp = signUp
module.exports.logIn = logIn