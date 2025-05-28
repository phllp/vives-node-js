import { Response } from "express";
import { AuthRequest } from "../middlewares/auth.middleware";
import DonationService from "../services/donation.service";
import {
  createDonationSchema,
  updateDonationSchema,
} from "../validations/donation";
import { Donation } from "../models/donation.model";
import { HelpRequest } from "../models/help-request.model";

export default class DonationController {
  private donationService: DonationService;

  constructor(donationService: DonationService) {
    this.donationService = donationService;
  }

  async createDonation(req: AuthRequest, res: Response) {
    const { error, value } = createDonationSchema.validate(req.body);
    console.log(value);
    if (error) {
      res.status(400).json({ error: error.details[0].message });
      return;
    }
    try {
      const { helpRequest } = value;
      const request = await HelpRequest.findById(helpRequest);

      if (!request) {
        res.status(404).json({ error: "Help request not found" });
        return;
      }

      if (request.status === "fulfilled") {
        res
          .status(400)
          .json({ error: "This help request has already been fulfilled" });
        return;
      }

      /**
       * The logged user is the donor, so we set the donor field
       * to the logged user's ID which is stored via the middleware
       */
      const donation = await Donation.create({
        ...value,
        donor: (req as any).user.id,
      });

      // Update the help request status to fulfilled
      request.status = "fulfilled";
      await request.save();

      res.status(201).json(donation);
      return;
    } catch (error) {
      console.error("Error creating donation:", error);
      res.status(500).json({ error: "Internal server error" });
      return;
    }
  }

  async getAllDonations(req: AuthRequest, res: Response) {
    const donations = await Donation.find().populate("donor", "name email");
    res.json(donations);
    return;
  }

  async getDonationById(req: AuthRequest, res: Response) {
    const donation = await Donation.findById(req.params.id).populate(
      "donor",
      "name email",
    );
    if (!donation) {
      res.status(404).json({ error: "Donation not found" });
      return;
    }
    res.json(donation);
    return;
  }

  async updateDonation(req: AuthRequest, res: Response) {
    const { error, value } = updateDonationSchema.validate(req.body);
    if (error) {
      res.status(400).json({ error: error.details[0].message });
      return;
    }

    const donation = await Donation.findByIdAndUpdate(req.params.id, value, {
      new: true,
    });
    if (!donation) {
      res.status(404).json({ error: "Donation not found" });
      return;
    }
    res.json(donation);
    return;
  }

  // todo: add validation so that only the donor can delete the donation
  async deleteDonation(req: AuthRequest, res: Response) {
    const donation = await Donation.findById(req.params.id);

    // const donation = await Donation.findByIdAndDelete(req.params.id);

    if (!donation) {
      res.status(404).json({ error: "Donation not found" });
      return;
    }
    const request = await HelpRequest.findById(donation?.helpRequest);
    if (request) {
      request.status = "open"; // Reset the help request status to open
      await request.save();
    }
    res.status(204).json({ message: "Donation deleted" });
    return;
  }
}
