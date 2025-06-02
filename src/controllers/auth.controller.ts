import { NextFunction, Request, Response } from "express";
import AuthService from "../services/auth.service";
import { createUserSchema } from "../validations/user";
import { ValidationError } from "../errors/validation-error";
import { UnauthorizedError } from "../errors/unauthorized";

export default class AuthController {
  private authService: AuthService;
  constructor(authService: AuthService) {
    this.authService = authService;
  }

  register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { error, value } = createUserSchema.validate(req.body);
      if (error) {
        throw new ValidationError(error.details[0].message);
      }
      const { name, email, password, role } = value;
      const user = await this.authService.register(name, email, password, role);
      res.status(201).json({ id: user._id, email: user.email });
    } catch (error: any) {
      next(error);
    }
  };

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        throw new ValidationError("All fields are required");
      }
      const login = await this.authService.login(email, password);
      if (!login) {
        throw new UnauthorizedError("Invalid email or password");
      }
      res.json({ token: login });
    } catch (error: any) {
      next(error);
    }
  };
}
