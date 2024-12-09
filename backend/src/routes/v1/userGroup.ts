import { Router } from "express";
import * as userController from "../../controllers/user.controller";

const router = Router();

router.post("/", userController.create);
router.post("/login", userController.login);
router.get("/", userController.me)
router.get("/logout", userController.logout);

export default router;
