import { Request, Response } from "express";
import AuthService from "../services/auth.service";
import { createUserSchema } from "../validations/user";
import { AppError } from "../errors/app-error";
import { ValidationError } from "../errors/validation-error";

export default class AuthController {
  private authService: AuthService;
  constructor(authService: AuthService) {
    this.authService = authService;
  }

  register = async (req: Request, res: Response) => {
    try {
      const { error, value } = createUserSchema.validate(req.body);
      if (error) {
        throw new ValidationError(error.details[0].message);
      }
      const { name, email, password, role } = value;
      const user = await this.authService.register(name, email, password, role);
      res.status(201).json({ id: user._id, email: user.email });
      return;
    } catch (error: any) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ error: error.message });
        return;
      }
      res.status(500).json({ error: "Internal server error" });
    }
  };

  login = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        throw new ValidationError("All fields are required");
      }
      const login = await this.authService.login(email, password);
      if (!login) {
        res.status(401).json({ message: "Invalid credentials" });
        return;
      }
      res.json({ token: login });
    } catch (error: any) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ error: error.message });
        return;
      }
      res.status(500).json({ error: "Internal server error" });
    }
  };
}
