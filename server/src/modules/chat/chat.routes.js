import { Router } from "express";
import * as chatController from "./chat.controller.js";
import { Auth } from "../../middlewares/Auth.js";
const router = Router();

router.post("/", Auth, chatController.sendMessage);
router.get("/:receiverId", Auth, chatController.getMessages);

export default router;
