const { JWT_SECRET } = require("./config");
const jwt = require("jsonwebtoken");
const  authMiddleware=(req,res,next)=>{
    //! Authentication by Harkirat based on manual jwttoken
    // const authHeader=req.headers.authorization;
    // if(!authHeader || !authHeader.startsWith('Bearer')){
    //    return  res.status(403).json({

    //     });
    // }
    // const token=authHeader.split(' ')[1];
    // try{
    //     const decoded=jwt.verify(token,JWT_SECRET);

    //     req.userId=decoded.userId;
    //     next();
    // }
    // catch(err){
    //     return res.status(403).json({
    //         msg:err
    //     })
    // }

    //* Authentication by online article
    const token = req.cookies.jwt
  if (token) {
    try{
    const decoded= jwt.verify(token, JWT_SECRET);
    req.userId=decoded.userId;
    next();
    }
    catch(err){
        return res.status(403).json({});
      }
    }
   else {
    return res.status(401).json({ message: "Not authorized, token not available" })
  }

  

};

module.exports=authMiddleware;