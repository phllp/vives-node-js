import { Response } from "express";
import { AuthRequest } from "../middlewares/auth.middleware";
import UserService from "../services/user.service";

export default class UserController {
  private userService: UserService;
  constructor(userService: UserService) {
    this.userService = userService;
  }

  getMe = async (req: AuthRequest, res: Response) => {
    try {
      const user = await this.userService.getLoggedUserData(req.user.id);
      res.json(user);
      return;
    } catch (error: any) {
      if (error.message === "User not found") {
        res.status(404).json({ message: "User not found" });
      } else {
        console.error("Error fetching user data:", error);
        res.status(500).json({ message: "Internal server error" });
      }
    }
  };
}
