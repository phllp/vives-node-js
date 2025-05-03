import { Response } from "express";
import { AuthRequest } from "../middlewares/auth.middleware";
import { User } from "../models/user.model";
import UserService from "../services/user.service";

export default class UserController {
  private userService: UserService;
  constructor(userService: UserService) {
    this.userService = userService;
  }

  async getMe(req: AuthRequest, res: Response) {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.json(user);
    return;
  }
}
