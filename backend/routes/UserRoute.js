import express from "express";
import { userController, updateUser } from "../controllers/UserController.js";
import { verifyToken } from "../utils/VerifyUser.js";

const router = express.Router();

router.get('/', userController)
router.post("/update/:id", verifyToken, updateUser)

export default router;
