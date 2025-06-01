import { HelpRequest, IHelpRequest } from "../../models/help-request.model";

export default class HelpRequestRepository {
  async createHelpRequest(data: any): Promise<any> {
    const helpRequest = await HelpRequest.create({
      ...data,
    });
    return helpRequest;
  }

  async getAllHelpRequests(): Promise<any[]> {
    const helpRequests = await HelpRequest.find().populate("requester", "name");
    return helpRequests;
  }

  async getHelpRequestById(id: string): Promise<IHelpRequest | null> {
    try {
      const helpRequest = await HelpRequest.findById(id).populate(
        "requester",
        "name",
      );
      return helpRequest;
    } catch (error) {
      console.error("Error fetching Help Request by ID:", error);
      return null;
    }
  }

  async updateHelpRequest(id: string, data: any): Promise<any> {
    const helpRequest = await HelpRequest.findByIdAndUpdate(id, data, {
      new: true,
    });
    return helpRequest;
  }

  // Method to delete a help request
  async deleteHelpRequest(id: string): Promise<void> {
    await HelpRequest.findByIdAndDelete(id);
  }

  async getOpenHelpRequests(): Promise<any[]> {
    const openRequests = await HelpRequest.find({ status: "open" }).populate(
      "requester",
      "name",
    );
    return openRequests;
  }

  async getHelpRequestsByRequesterId(requesterId: string): Promise<any[]> {
    const helpRequests = await HelpRequest.find({
      requester: requesterId,
    }).populate("requester", "name");
    return helpRequests;
  }
}
