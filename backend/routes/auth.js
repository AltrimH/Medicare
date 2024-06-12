import express from "express";
import { register, login } from "../controllers/authController.js";

// import auth from "../middleware/auth.js"

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

export default router