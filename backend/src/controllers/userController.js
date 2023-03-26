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
        const user = await userModel.findOne({email,password})
        if(!user){
            return res.status(400).send({status: false,message: "please give correct credentials!!"})
        }
        const iat = Date.now()
        const exp = iat+(1000*60)
        const token = jwt.sign({userId: user._id,iat: iat,exp: exp},'SECRET-KEY')
        res.setHeader("Authorzation", token)
        //nbhh.hb,nxlocalStorage.setItem('token',token)
        return res.status(200).send({status: true, message: 'You are successfully loggedin!!', data: {userId:user._id,token}})
    }catch(err){
        return res.status(500).send({status: false, message: err.message})
    }
}

module.exports.signUp = signUp
module.exports.logIn = logIn