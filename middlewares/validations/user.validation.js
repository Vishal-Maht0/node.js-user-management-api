import Joi from "joi";
import { AppError } from "../../errors/AppError.js";


export const userValidation = Joi.object({
    name : Joi.string().required().messages({"string.empty" : "Name cannot be empty"}),
    email : Joi.string().email().required().messages({
        "string.empty" : "email cannot be empty"
    }),
    password : Joi.string().required()
})


export const validateUserValidation = (req, res, next) =>{
    const {error, value} = userValidation.validate(req.body, {
        abortEarly : false
    })
    if(error) {
        return res.status(400).json({
            success : false,
            message : error.details.map((err) => err.message)
        })
    }
    req.body = value,
    next()
}




export const updateUserValidation = Joi.object({
    name : Joi.string().min(6).max(30),
    email : Joi.string().email().lowercase()
}).min(1)

export const validateUpdateUser = ( req, res, next) =>{
    const {error, value} = updateUserValidation.validate(req.body, {abortEarly : false, stripUnknown : true})
    if(error) {
        const message = error.details.map((err) => err.message).join(", ")

        return next(new AppError(message, 400))
    }
    req.body = value
    next()
}

