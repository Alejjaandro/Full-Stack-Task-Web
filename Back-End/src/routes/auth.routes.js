import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { login, register, logout, profile, verifyToken } from "../controllers/auth.controller.js";

// Import validators
import { validator } from "../middlewares/validator.js";
import { registerValidator, loginValidator } from "../validators/auth.validator.js";


const router = Router();

// Establishing routes

    // Validate register and login data before continue.
router.post('/register', validator(registerValidator), register);
router.post('/login', validator(loginValidator), login);

router.post('/logout', logout);
router.get('/verify', verifyToken);
router.get('/profile', authRequired, profile);

export default router;