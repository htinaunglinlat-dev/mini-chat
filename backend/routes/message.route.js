import express from "express";
import { getMessages, sendMessage } from "../controllers/message.controller.js";
// import protectRoute from "../middleware/protectRoute.js";
import {verifyToken} from './../middleware/verifyToken.js'

const router = express.Router();

router.get("/:id", verifyToken, getMessages);
router.post("/send/:id", verifyToken, sendMessage);

export default router;