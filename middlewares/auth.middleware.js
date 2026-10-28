import jwt from "jsonwebtoken"
import { AppError } from "../errors/AppError.js";
import User from "../models/user.model.js";



export const authMiddleware = async (req, res, next) =>{
    try{
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith("Bearer ")) {
        return next(new AppError("Authentication Token is required",401))
    }

    const splitToken = authHeader.split(" ")[1]

    const verifyToken = jwt.verify(splitToken, process.env.JWT_SECRET)

    const user = await User.findById(verifyToken.userId).select("tokenVersion")

    if(!user) {
        return next(new AppError("User not found", 401))
    }

    const tokenVersion = verifyToken.tokenVersion ?? 0;
    const currentVersion = user.tokenVersion ?? 0

    if(tokenVersion !== currentVersion) {
        return next (new AppError("Invalid or Revoked token",401))
    }

    // console.log(verifyToken)
    req.user = verifyToken

    next()
    }
    catch(err) {
        
        // console.log("ERROR NAME:", err.name)
        //  console.log("ERROR:", err)

        if(err.name === "TokenExpiredError") {

            return next(new AppError("Token is Expired", 401))
        }

        if(err.name === "JsonWebTokenError") {

            return next(new AppError("Invalid Token", 401))
        }

        // return res.status(401).json({
        //     success : false,
        //     message : "Authentication Failed"
        // })

        return next(err)
    }
}





export const authorizeAdmin = (req, res, next) =>{
    try{
        if(req.user.role !== "admin"){
            // return res.status(403).json({
            //     success: false,
            //     message : "Access Denied. Admin Only."
            // })
            return next(new AppError("Access Denied. Admin Only", 403))
        }
        next()
    }
    catch(err){
        // console.log(err)
        next(err)
    }
}



export const ownershipMiddleware = (req, res, next) =>{
    try {
        if(req.user.role === "admin"){
            return next()
        }
        else if(req.user.userId === req.params.id) {
            return next()
        }
        else{
            return next(new AppError("You can only modify your own profile",403))
        }
    }
    catch(err){
        console.error(err)
        return next(err)
    }
}
