import express from "express";
import { getUserById } from "../controllers/User.controller.js";
import { validToken } from "../middleware/Auth.middleware.js";
const router = express.Router();

router.post("/getUserProfile", validToken, getUserById);

export default router;
