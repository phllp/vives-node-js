import { Request, Response } from "express";
import AuthService from "../services/auth.service";

export default class AuthController {
  private authService: AuthService;
  constructor(authService: AuthService) {
    this.authService = authService;
  }

  register = async (req: Request, res: Response) => {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password || !role) {
      res.status(400).json({ message: "All fields are required" });
      return;
    }
    try {
      const user = await this.authService.register(name, email, password, role);
      res.status(201).json({ id: user._id, email: user.email });
      return;
    } catch (error: any) {
      if (error.message === "Email already registered") {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
      return;
    }
  };

  login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ message: "All fields are required" });
      return;
    }
    try {
      const login = await this.authService.login(email, password);
      if (!login) {
        res.status(401).json({ message: "Invalid credentials" });
        return;
      }
      res.json({ token: login });
    } catch (error: any) {
      if (error.message === "User not found") {
        res.status(404).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
      return;
    }
  };
}
