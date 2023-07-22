import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { login, register, logout, profile } from "../controllers/auth.controller.js";

const router = Router();

// Establishing routes

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/profile', authRequired, profile);

export default router;