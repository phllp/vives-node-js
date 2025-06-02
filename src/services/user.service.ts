import UserRepository from "../database/repository/user.repository";
import { NotFoundError } from "../errors/not-found";

export default class UserService {
  private readonly userRepository: UserRepository;
  constructor() {
    this.userRepository = new UserRepository();
  }

  async getLoggedUserData(userId: string): Promise<any> {
    const user = await this.userRepository.getUserById(userId);
    if (!user) {
      throw new NotFoundError("User");
    }
    user.password = undefined;
    return user;
  }
}
