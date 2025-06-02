import HelpRequestRepository from "../database/repository/help-request.repository";
import UserRepository from "../database/repository/user.repository";
import { NotFoundError } from "../errors/not-found";
import { UnauthorizedError } from "../errors/unauthorized";

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
      throw new Error("Only recipients can create help requests");
    }
    try {
      const helpRequest = await this.helpRequestRepository.createHelpRequest(
        data,
      );
      return helpRequest;
    } catch (error) {
      console.error("Error creating Help Request:", error);
      throw new Error("Error creating Help Request");
    }
  }

  async getAllHelpRequests(): Promise<any[]> {
    try {
      const helpRequests =
        await this.helpRequestRepository.getAllHelpRequests();
      return helpRequests;
    } catch (error) {
      console.error("Error fetching Help Requests:", error);
      throw new Error("Error fetching Help Requests");
    }
  }

  async getHelpRequestById(id: string): Promise<any> {
    try {
      const helpRequest = await this.helpRequestRepository.getHelpRequestById(
        id,
      );
      return helpRequest;
    } catch (error) {
      console.error("Error fetching Help Request by ID:", error);
      throw new Error("Error fetching Help Request by ID");
    }
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
    try {
      const hr = await this.helpRequestRepository.getHelpRequestById(id);
      if (!hr) {
        return;
      }
      // Ensure the requester is the one trying to delete the help request
      if (hr.requester._id.toString() !== userId) {
        throw new Error("You can only delete your own help requests");
      }
      // Cant delete a help request that has been fulfilled
      if (hr.status === "fulfilled") {
        throw new Error("Cannot delete a fulfilled help request");
      }
      await this.helpRequestRepository.deleteHelpRequest(id);
    } catch (error: any) {
      console.error("Error deleting Help Request:", error);
      throw new Error(error.message || "Error deleting Help Request");
    }
  }

  async getOpenHelpRequests(): Promise<any[]> {
    try {
      const openHelpRequests =
        await this.helpRequestRepository.getOpenHelpRequests();
      return openHelpRequests;
    } catch (error) {
      console.error("Error fetching Open Help Requests:", error);
      throw new Error("Error fetching Open Help Requests");
    }
  }

  async getHelpRequestsByRequesterId(requesterId: string): Promise<any[]> {
    try {
      const helpRequests =
        await this.helpRequestRepository.getHelpRequestsByRequesterId(
          requesterId,
        );
      return helpRequests;
    } catch (error) {
      console.error("Error fetching Help Requests by Requester ID:", error);
      throw new Error("Error fetching Help Requests by Requester ID");
    }
  }
}
