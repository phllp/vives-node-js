import HelpRequestRepository from "../database/repository/help-request.repository";
import UserRepository from "../database/repository/user.repository";
import { NotFoundError } from "../errors/not-found";
import { UnauthorizedError } from "../errors/unauthorized";
import { ValidationError } from "../errors/validation-error";

export default class HelpRequestService {
  private helpRequestRepository: HelpRequestRepository;
  private userRepository: UserRepository;
  constructor() {
    this.helpRequestRepository = new HelpRequestRepository();
    this.userRepository = new UserRepository();
  }
  async createHelpRequest(data: any): Promise<any> {
    // Validate that the requester is a recipient
    const user = await this.userRepository.getUserById(data.requester);
    if (user.role !== "recipient") {
      throw new ValidationError("Only recipients can create help requests");
    }
    const helpRequest = await this.helpRequestRepository.createHelpRequest(
      data,
    );
    return helpRequest;
  }

  async getAllHelpRequests(): Promise<any[]> {
    const helpRequests = await this.helpRequestRepository.getAllHelpRequests();
    return helpRequests;
  }

  async getHelpRequestById(id: string): Promise<any> {
    const helpRequest = await this.helpRequestRepository.getHelpRequestById(id);
    if (!helpRequest) {
      throw new NotFoundError("Help Request");
    }
    return helpRequest;
  }

  async updateHelpRequest(id: string, data: any, userId: string): Promise<any> {
    const hr = await this.helpRequestRepository.getHelpRequestById(id);
    if (!hr) {
      throw new NotFoundError("Help Request");
    }
    if (hr.requester._id.toString() !== userId) {
      throw new UnauthorizedError("You can only update your own help requests");
    }

    const helpRequest = await this.helpRequestRepository.updateHelpRequest(
      id,
      data,
    );
    return helpRequest;
  }

  async deleteHelpRequest(id: string, userId: string): Promise<void> {
    const hr = await this.helpRequestRepository.getHelpRequestById(id);
    if (!hr) {
      return;
    }
    // Ensure the requester is the one trying to delete the help request
    if (hr.requester._id.toString() !== userId) {
      throw new UnauthorizedError("You can only delete your own help requests");
    }
    // Cant delete a help request that has been fulfilled
    if (hr.status === "fulfilled") {
      throw new ValidationError("Cannot delete a fulfilled help request");
    }
    await this.helpRequestRepository.deleteHelpRequest(id);
  }

  async getOpenHelpRequests(): Promise<any[]> {
    const openHelpRequests =
      await this.helpRequestRepository.getOpenHelpRequests();
    return openHelpRequests;
  }

  async getHelpRequestsByRequesterId(requesterId: string): Promise<any[]> {
    const helpRequests =
      await this.helpRequestRepository.getHelpRequestsByRequesterId(
        requesterId,
      );
    return helpRequests;
  }
}
