import { User } from "../../models/user.model";

export default class UserRepository {
  async getUserByEmail(email: string): Promise<any> {
    try {
      const user = await User.findOne({ email });
      return user;
    } catch (error) {
      console.error("Error fetching user by email:", error);
      return null;
    }
  }

  async getUserById(id: string): Promise<any> {
    try {
      const user = await User.findById(id);
      return user;
    } catch (error) {
      console.error("Error fetching user by ID:", error);
      return null;
    }
  }

  async createUser(
    name: string,
    email: string,
    password: string,
    role: string,
  ): Promise<any> {
    try {
      const user = await User.create({ name, email, password, role });
      return user;
    } catch (error) {
      throw new Error("Method not implemented.");
    }
  }
}
