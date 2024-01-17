import { Router } from "express";
import * as chatController from "./chat.controller.js";
const router = Router();

router.post("/", chatController.sendMessage);

export default router;
