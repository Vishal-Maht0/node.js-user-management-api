import mongoose from "mongoose";
import User from "../models/user.model.js";
import { AppError } from "../errors/AppError.js";


export const createUser = async(req, res, next) =>{
    try{
        const  user = await User.create(req.body)

        return res.status(200).json({
            success : true,
            message : "User Created Sucessfully!!",
            user : user
        })
    }
    catch(err) {
        console.error(err)
        next(err)
    }
}


export const findAllUsers = async (req, res, next) =>{
    try{
        const users =  await User.find()

        console.log("Logged in User : ", req.user)
        
        return res.status(200).json({
            success : true,
            AllUsers : users  
        })
    }
    catch(err) {
        console.error(err)
        next(err)
    }
}


export const findOneUserById = async (req, res, next) =>{
    try{
        if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                success : false,
                message : "Invalid User ID!!"
            })
        }

        const singleUser = await User.findById(req.params.id)

        if(!singleUser) {
            // return res.status(404).json({
            //     success : false,
            //     message : "User not found!!"
            // })

             return next(new AppError("User not found!!", 404))
        }

        return res.status(200).json({
            success : true,
            singleUser
        })
    }
    catch(err) {
        console.error(err)

        next(err)
    }
}



export const updateUser = async(req, res, next) =>{
    try{
        if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                success : false,
                message : "Invalid User ID!!"
            })
        }
        const {name, email} = req.body

        const updateData = {}

        if(name !== undefined) {
            updateData.name = name
        }
        if(email !== undefined){
            updateData.email = email
        }

        const user = await User.findByIdAndUpdate(req.params.id, updateData, {returnDocument : "after"})

        if(!user) {
            return next(new AppError("User not found!", 404))
        }

        console.log("User updated sucessfully")
        return res.status(200).json({
            success : true,
            message: "User updated sucessfully",
            user
        })
    }

     catch(err) {
        console.error(err)
        next(err)
    }
}


export const deleteUser = async (req, res, next) =>{
    console.log("🔥 deleteUser controller executed");

    try{
        if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                success : false,
                message : "Invalid User ID!!"
            })
        }

        const user = await User.findByIdAndDelete(req.params.id)

        if(!user) {
            return next(new AppError("User not found!", 404))
        }

        return res.status(200).json({
            success : true,
            message : "User Deleted Sucessfully!!",
            deletedUser : user
        })
    }
         catch(err) {
        console.error(err)
        next(err)
    }
}


