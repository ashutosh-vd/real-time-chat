import { Router } from "express";
import { protectedRoute } from "../middlewares/protectedRoute.middleware.js";
import { checkauth, getMessages, getUsersForSidebar, sendMessage } from "../controller/message.controller.js";

const router = Router();

router.get("/checkauth", protectedRoute, checkauth);

router.get("/sidebar", protectedRoute, getUsersForSidebar);

router.get("/:id/messages", protectedRoute, getMessages);

router.post("/:id/send", protectedRoute, sendMessage);

export default router;