const userModel = require("../models/userModel")
const jwt = require("jsonwebtoken")
const idGetter = require("mongoose/lib/helpers/schema/idGetter")
const { isValidElement } = require("react")

const emailRegex=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,5})+$/
const validPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/
const signUp = async (req, res)=>{
    try{
        const {userName, email, mobileNo, password, confirmPassword} = req.body
        
        const mobileRegex = /^[6-9][0-9]{9}$/
        
        if(Object.keys(req.body).length==0){
            return res.status(400).send({status: false,message: 'Please provide details to create report'})
        }
        if( userName===null || typeof userName==='undefined'){
            return res.status(400).send({status: false,message: 'Please provide username'})
        }
        if( email===null || typeof email==='undefined'){
            return res.status(400).send({status: false,message: 'Please provide email'})
        }
        if( mobileNo===null || typeof mobileNo==='undefined'){
            return res.status(400).send({status: false,message: 'Please provide Mobile No'})
        }
        if(!mobileRegex.test(mobileNo)){
            return res.status(400).send({status: false,message: 'Please enetr valid Mobile No'})
        }
        if( password===null || typeof password==='undefined'){
            return res.status(400).send({status: false,message: 'Please provide password'})
        }
        if(password.trim().length<8 || password.trim().length>12 || !validPassword.test(password)){
            return res.status(400).send({status: false,message: 'Password should have minimum 8 characters including special character,1 uppercase amd 1 lowercase'})
        }
        
        if( confirmPassword===null || typeof confirmPassword==='undefined'){
            return res.status(400).send({status: false,message: 'Please confirm password'})
        }
        const isEmailValid=emailRegex.test(email)
        if(!isEmailValid){
            return res.status(400).send({status: false,message: 'Please provide correct email'})
        }
        if(password!==confirmPassword){
            return res.status(400).send({status: false,message: 'Password not matching'})
        }
    const userDetail = await userModel.create(req.body)
    return res.status(201).send({status: true, data: userDetail})
    }catch(err){
        return res.status(500).send({status:false, message: err.message})
    }
}

const logIn = async (req, res)=>{
    try{
        const {email, password} = req.body
        if(Object.keys(req.body).length==0){
            return res.status(400).send({status: false,message: 'Please provide detail to login'})
        }
        if( email===null || typeof email==='undefined'){
            return res.status(400).send({status: false,message: 'Please provide email'})
        }
        if(!emailRegex.test(email)){
            return res.status(400).send({status: false,message: 'Please provide correct email'})
        }
        if( password===null || typeof password==='undefined'){
            return res.status(400).send({status: false,message: 'Please provide password'})
        }
        if(password.trim().length<8 || password.trim().length>12 || !validPassword.test(password)){
            return res.status(400).send({status: false,message: 'Password should have minimum 8 characters including special character,1 uppercase amd 1 lowercase'})
        }
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