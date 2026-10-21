import express from "express"
const router = express.Router()
import { createUser, deleteUser, findAllUsers, findOneUserById,  updateUser } from "../controllers/user.controller.js"
import { authMiddleware, authorizeAdmin, ownershipMiddleware } from "../middlewares/auth.middleware.js"
import { validateUpdateUser, validateUserValidation } from "../middlewares/validations/user.validation.js"


router.post("/", validateUserValidation, createUser)
router.get("/", authMiddleware, findAllUsers)
router.get("/:id", findOneUserById)
router.patch("/:id",authMiddleware, ownershipMiddleware, validateUpdateUser, updateUser)
router.delete("/:id", authMiddleware, authorizeAdmin,  deleteUser)




export default router

    