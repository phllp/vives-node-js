import { Donation, IDonation } from "../../models/donation.model";
import { IHelpRequest } from "../../models/help-request.model";

export default class DonationRepository {
  async createDonation(data: any): Promise<any> {
    const donation = await Donation.create({
      ...data,
    });
    return donation;
  }

  async getAllDonations(): Promise<any[]> {
    const donations = await Donation.find().populate("donor", "name email");
    return donations;
  }

  async getDonationById(id: string): Promise<IDonation | null> {
    try {
      const donation = await Donation.findById(id).populate(
        "donor",
        "name email",
      );
      return donation;
    } catch (error) {
      console.error("Error fetching Donation by ID:", error);
      return null;
    }
  }

  async updateDonation(id: string, data: any): Promise<any> {
    const donation = await Donation.findByIdAndUpdate(id, data, {
      new: true,
    });
    return donation;
  }

  async deleteDonation(id: string): Promise<void> {
    await Donation.findByIdAndDelete(id);
  }

  async getDonationsByDonor(donorId: string): Promise<IDonation[]> {
    const donations = await Donation.find({ donor: donorId }).populate(
      "donor",
      "name email",
    );
    return donations;
  }
}
