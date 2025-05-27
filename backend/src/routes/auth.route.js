import { Router } from "express";
import { signup } from "../controller/auth.controller.js";
const router = Router();

router.post('/signup', signup)

router.get('/login', (req, res) => {
	res.send('login route');
})

router.get('/logout', (req, res) => {
	res.send('logout route');
})

export default router;