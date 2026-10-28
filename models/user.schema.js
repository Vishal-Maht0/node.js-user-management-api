import mongoose from "mongoose";

 const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        // unique : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    
        password : {
            type : String,
            required : true,
            select : false
        },

        role : {
            type : String,
            default : "user"
        },

        tokenVersion : {
           type : Number,
            default : 0
        }

 },{timestamps : true})


 export default userSchema