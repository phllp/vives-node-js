import { Router } from "express";
import AuthController from "../controllers/auth.controller";
import AuthService from "../services/auth.service";
import { authenticate } from "../middlewares/auth.middleware";
import UserService from "../services/user.service";
import UserController from "../controllers/user.controller";

const router = Router();

const authService = new AuthService();
const userService = new UserService();
const authController = new AuthController(authService);
const userController = new UserController(userService);

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/me", authenticate, userController.getMe);

export default router;
