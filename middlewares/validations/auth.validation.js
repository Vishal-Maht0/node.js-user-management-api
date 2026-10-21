import Joi from "joi";
import { AppError } from "../../errors/AppError.js";


/*
export const authValidation = Joi.object({
    name  : Joi.string().required(),
    email : Joi.string().email().required(),
    role : Joi.string().required(),
    password : Joi.string().min(6).required()
})


export const validateAuth = (req, res, next) =>{
    const {error, value} = authValidation.validate(req.body, {
        abortEarly : false
    })

    if(error) {
        const message = error.details.map((err) => err.message).join(", ")
        return next(new AppError(message, 400))
    }
        req.body = value
        next()
}
*/




export const registerValidation = Joi.object({
    name : Joi.string().required().min(6).max(30),
    email : Joi.string().email().lowercase().required(),
    // role : Joi.string().min(4).max(10).required(),  ye role ko isliye comment kiya kyu ki user ne agar admin daal diya role mai to fir game baj jaega.
    password : Joi.string().min(6).max(30).required()
})

export const validateRegister = (req, res, next) =>{
    const {error, value} = registerValidation.validate(req.body, {
        abortEarly : false,
        stripUnknown : true
    })
    if(error) {
        const message = error.details.map((err) => err.message).join(", ")
        return next(new AppError(message, 400))
    }
    req.body = value
    next()
}



export const loginValidation = Joi.object({
    email : Joi.string().email().lowercase().required(),
    password : Joi.string().min(6).max(30).required()
})

export const validateLogin = (req, res, next) =>{
    const {error, value} = loginValidation.validate(req.body, {
        abortEarly : false,
        stripUnknown : true
    })
    if(error) {
        const message = error.details.map((err) => err.message).join(", ")
        return next (new AppError(message, 400))
    }
    req.body = value
    
    /* console.log("Validated Body:", req.body)     ye line testing ke liye the ki unknown fields to login ke saath to nahi aa rhe hai uska.
     stripUnknown : true ko check karne ke liye  */

    next()
}


export const changePasswordValidation = Joi.object({
    currentPassword : Joi.string().min(6).max(30).required(),
    newPassword : Joi.string().min(6).max(30).required()
})

export const validateChangePassword = (req, res, next) =>{
    const {error, value} = changePasswordValidation.validate(req.body, {abortEarly : false, stripUnknown : true})
    if(error) {
        const message = error.details.map((err) => err.message).join(", ")
        return next(new AppError(message, 403))
    }
    req.body = value
    next()
}