import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { sendMessage, getMessages } from "../controllers/message.controller.js";

const router = express.Router();

// api routes

// get message between a random user and loggedin user
router.get("/:id", protectRoute, getMessages);
// send message between any user and loggedin user
router.post("/send/:id", protectRoute, sendMessage);

export default router;
