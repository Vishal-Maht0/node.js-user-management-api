import jwt from "jsonwebtoken"
import { AppError } from "../errors/AppError.js";


export const authMiddleware = (req, res, next) =>{
    try{
    const authHeader = req.headers.authorization;
    const splitToken = authHeader.split(" ")[1]

    const verifyToken = jwt.verify(splitToken, process.env.JWT_SECRET)

    console.log(verifyToken)
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

        return next(new AppError("Authentication Failed", 401))
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