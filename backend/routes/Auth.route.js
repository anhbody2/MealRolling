import express from "express";
import { register, login, refreshAccessToken } from "../controllers/Auth.controller.js";
const router = express.Router();

router.post("/reg", register);
router.post("/login", login);
router.post("/refresh", refreshAccessToken)

export default router;
