import { Router } from "express";
import { login, signup } from "../controller/auth.controller.js";
const router = Router();

router.post('/signup', signup)

router.post('/login', login)

router.get('/logout', (req, res) => {
	res.send('logout route');
})

export default router;