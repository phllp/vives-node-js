import { NextFunction, Response } from "express";
import { AuthRequest } from "../middlewares/auth.middleware";
import UserService from "../services/user.service";

export default class UserController {
  private userService: UserService;
  constructor(userService: UserService) {
    this.userService = userService;
  }

  getMe = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const user = await this.userService.getLoggedUserData(req.user.id);
      res.json(user);
    } catch (error: any) {
      next(error);
    }
  };
}
