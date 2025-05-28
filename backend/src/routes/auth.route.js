import { Router } from "express";
import { login, logout, signup, update } from "../controller/auth.controller.js";
import { protectedRoute } from "../middlewares/protectedRoute.middleware.js";
const router = Router();

router.post('/signup', signup)

router.post('/login', login)

router.post('/logout', logout)

router.post('/update', protectedRoute, update)

export default router;