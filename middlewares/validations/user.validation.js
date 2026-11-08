import Joi from "joi";
import { AppError } from "../../errors/AppError.js";






export const updateUserValidation = Joi.object({
    name : Joi.string().trim().min(2).max(30),
    email : Joi.string().trim().email().lowercase()
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

