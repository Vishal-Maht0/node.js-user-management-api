import bcrypt from "bcrypt"
import User from "../models/user.model.js"
import jwt from "jsonwebtoken"
import { AppError } from "../errors/AppError.js"



export const registerUser = async (req, res, next) =>{
    try{
        const {name, email,  password} = req.body

        const existingUser = await User.findOne({email})
        if(existingUser) {
            return next(new AppError("Email Already Exists", 409))
        }
        
        const hashedPassword = await bcrypt.hash(password, 10)

         const user =  new User ({
         name : name,
         email : email,
        //  role : role,
         password : hashedPassword
})
        await user.save()

        return res.status(201).json({
            success : true,
            message : "User Registered Sucssfully!!",
            user : {
                name,
                email
            }
        })
    }
    catch(err) {
         console.error(err)
         if(err.code === 11000 && err.keyPattern?.email) {
            
             return next(new AppError("Email Already Exists", 409))
         }
         next(err)
        }
}
 




export const loginUser = async (req, res, next) => {
    try {

        const { email, password } = req.body;

        const user = await User
            .findOne({ email })
            .select("+password");

        if (!user) {
            return next(new AppError("Invalid Email and Password", 401))
        }

        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {
            return next(new AppError("Invalid Email and Password!", 401))
        }

        // YAHAN JWT AAYEGA 🔥
        const token = jwt.sign(
        { userId: user._id, 
          role : user.role
        },
        process.env.JWT_SECRET,
        { expiresIn: "1D"}
);


        return res.status(200).json({
            success: true,
            message: "Login credentials are correct",
            token
        });

    } 
       catch(err) {
         console.error(err)
        next(err)
    }
};




export const changePassword = async(req, res, next) =>{
    try{
        const {currentPassword, newPassword} = req.body
        if(currentPassword === newPassword) {
            return next(new AppError("New Password must be different from current password" ,400))
        }

        const user = await User.findById(req.user.userId).select("+password")
        if(!user) {
            return next(new AppError("User Not Found", 404))
        }

        const isMatch = await bcrypt.compare(currentPassword, user.password) 
        if(!isMatch) {
            return next(new AppError("Current Password is incorrect", 401))
        }

        const newPasswordHash = await bcrypt.hash(newPassword, 10)
        user.password = newPasswordHash
        await user.save()

        return res.status(200).json({
            success : true,
            message : "Password Changed Successfully!!"
        })

    }

    catch(err) {
        next(err)
    }
}

