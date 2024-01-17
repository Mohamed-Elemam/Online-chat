import { Router } from "express";
import * as userController from "./user.controller.js";
import { Auth } from "../../middlewares/Auth.js";
const router = Router();

router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/logout/:userId", userController.logout);
router.get("/", Auth, userController.onlineUsers);

export default router;
