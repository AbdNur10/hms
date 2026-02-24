import express from "express";
import { getAllMessages, sendMessage } from "../controller/messageController.js";
import { isAdminAutheticated } from "../middlewares/auth.js";

const router = express.Router();

router.post ("/send", sendMessage);
router.get("/getall",isAdminAutheticated,getAllMessages)

export default router