const jwt = require("jsonwebtoken")
const auth = (req, res, next)=>{
    try{
        const token = req.headers["Authorization"||"authorization"]
    if(!token){
        return res.status(401).send({status: false, message: 'Please login'})
    }
    const decodedToken = jwt.verify("SECRET-KEY",token)
     req.loggedInuserId = decodedToken.user
    next()
    }catch(err){
        return res.status(500).send({status: false, message: err.message})
    }
}

module.exports.auth = auth