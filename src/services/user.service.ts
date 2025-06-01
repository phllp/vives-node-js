import UserRepository from "../database/repository/user.repository";

export default class UserService {
  private readonly userRepository: UserRepository;
  constructor() {
    this.userRepository = new UserRepository();
  }

  async getLoggedUserData(userId: string): Promise<any> {
    const user = await this.userRepository.getUserById(userId);
    if (!user) {
      throw new Error("User not found");
    }
    user.password = undefined;
    return user;
  }
}
