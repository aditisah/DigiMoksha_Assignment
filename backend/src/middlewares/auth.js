const jwt = require("jsonwebtoken")
const auth = (req, res, next)=>{
    try{
        let token;
        const tokenStr = req.headers["authorization"||"Authorization"]
        if(tokenStr==='null'||tokenStr==='undefined'){
             token=JSON.parse(tokenStr)
        }else{
            token = tokenStr
        }
        
    if(!token){
        return res.status(401).send({status: false, message: 'Please login'})
    }
    const decodedToken = jwt.verify(token,"SECRET-KEY")
     req.loggedInuserId = decodedToken.userId
    next()
    }catch(err){
        return res.status(500).send({status: false, message: err.message})
    }
}

module.exports.auth = auth