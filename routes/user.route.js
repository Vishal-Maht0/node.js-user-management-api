import express from "express"
const router = express.Router()
import { deleteUser, findAllUsers, findOneUserById,  updateUser } from "../controllers/user.controller.js"
import { authMiddleware, authorizeAdmin, ownershipMiddleware } from "../middlewares/auth.middleware.js"
import { validateUpdateUser } from "../middlewares/validations/user.validation.js"



router.get("/", authMiddleware, authorizeAdmin, findAllUsers)
router.get("/:id", authMiddleware, ownershipMiddleware, findOneUserById)
router.patch("/:id",authMiddleware, ownershipMiddleware, validateUpdateUser, updateUser)
router.delete("/:id", authMiddleware, authorizeAdmin,  deleteUser)




export default router

    