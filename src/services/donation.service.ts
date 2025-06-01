import DonationRepository from "../database/repository/donation.repository";
import HelpRequestRepository from "../database/repository/help-request.repository";
import UserRepository from "../database/repository/user.repository";
import { NotFoundError } from "../errors/not-found";
import { UnauthorizedError } from "../errors/unauthorized";
import { ValidationError } from "../errors/validation-error";

export default class DonationService {
  private readonly donationRepository: DonationRepository;
  private readonly helpRequestRepository: HelpRequestRepository;
  private readonly userRepository: UserRepository;
  constructor() {
    this.donationRepository = new DonationRepository();
    this.helpRequestRepository = new HelpRequestRepository();
    this.userRepository = new UserRepository();
  }
  async createDonation(data: any, donor: string): Promise<any> {
    const { helpRequest, category } = data;

    const request = await this.helpRequestRepository.getHelpRequestById(
      helpRequest,
    );

    const user = await this.userRepository.getUserById(donor);
    if (user.role !== "donor") {
      throw new ValidationError("Only Donors can create Donations");
    }

    if (!request) {
      throw new NotFoundError("Help request");
    }

    if (request.status === "fulfilled") {
      throw new ValidationError("This help request has already been fulfilled");
    }

    if (request.category !== category) {
      throw new ValidationError(
        "The category of the help request does not match the donation category",
      );
    }
    const donation = await this.donationRepository.createDonation({
      ...data,
      donor,
    });

    // Update the help request status to fulfilled
    // todo: move this logic to the repository
    request.status = "fulfilled";
    await request.save();

    return donation;
  }

  async getAllDonations(): Promise<any[]> {
    return this.donationRepository.getAllDonations();
  }

  async getDonationById(id: string): Promise<any> {
    const donation = await this.donationRepository.getDonationById(id);
    if (!donation) {
      throw new NotFoundError("Donation");
    }
    return donation;
  }

  async updateDonation(id: string, data: any): Promise<any> {
    const { category } = data;
    const donation = await this.donationRepository.getDonationById(id);
    if (!donation) {
      throw new NotFoundError("Donation");
    }

    if (category && category !== donation.category) {
      throw new ValidationError(
        "The category of the help request does not match the donation category",
      );
    }
    return await this.donationRepository.updateDonation(id, data);
  }

  async deleteDonation(id: string, userId: string): Promise<void> {
    const donation = await this.donationRepository.getDonationById(id);
    if (!donation) {
      throw new NotFoundError("Donation");
    }

    if (donation.donor._id.toString() !== userId) {
      throw new UnauthorizedError("You can only delete your own donations");
    }

    const { helpRequest } = donation;

    // Reset the help request status to open
    const request = await this.helpRequestRepository.getHelpRequestById(
      helpRequest._id.toString(),
    );
    if (request) {
      request.status = "open";
      await request.save();
    }

    await this.donationRepository.deleteDonation(id);
  }

  async getMyDonations(donorId: string): Promise<any[]> {
    return this.donationRepository.getDonationsByDonor(donorId);
  }
  async getDonationOverview(): Promise<any> {
    const donations = await this.donationRepository.getAllDonations();
    const helpRequests = await this.helpRequestRepository.getAllHelpRequests();
    const openRequests = helpRequests.filter(
      (request) => request.status === "open",
    ).length;

    const fulfilledRequests = helpRequests.filter(
      (request) => request.status === "fulfilled",
    ).length;

    const overview = {
      totalDonations: donations.length,
      totalHelpRequests: helpRequests.length,
      openHelpRequests: openRequests,
      fulfilledHelpRequests: fulfilledRequests,
    };

    return overview;
  }
}
