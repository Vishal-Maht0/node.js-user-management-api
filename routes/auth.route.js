import express from "express"
const router = express.Router()
import { changePassword, loginUser, registerUser } from "../controllers/auth.controller.js"
import {validateChangePassword, validateLogin, validateRegister } from "../middlewares/validations/auth.validation.js"
import { authMiddleware } from "../middlewares/auth.middleware.js"

router.post("/register", validateRegister, registerUser)
router.post("/login", validateLogin,  loginUser)
router.patch("/change-password", authMiddleware, validateChangePassword, changePassword )


export default router   