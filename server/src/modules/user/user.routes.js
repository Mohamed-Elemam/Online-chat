import { Router } from "express";
import * as userController from "./user.controller.js";
const router = Router();

router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/logout/:userId", userController.logout);

export default router;
