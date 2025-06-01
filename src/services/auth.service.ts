import UserRepository from "../database/repository/user.repository";
import bcrypt from "bcryptjs";
import { signToken } from "../utils/jwt";

export default class AuthService {
  private readonly userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async login(email: string, password: string): Promise<any> {
    const user = await this.userRepository.getUserByEmail(email);
    if (!user) {
      throw new Error("User not found");
    }
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return false;
    }
    const token = signToken({ id: user._id, role: user.role });
    return token;
  }

  async register(
    name: string,
    email: string,
    password: string,
    role: string,
  ): Promise<any> {
    const userExists = await this.userRepository.getUserByEmail(email);
    if (userExists) {
      throw new Error("Email already registered");
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = await this.userRepository.createUser(
      name,
      email,
      hashed,
      role,
    );
    return user;
  }
}
