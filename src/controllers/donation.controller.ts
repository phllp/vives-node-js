import { Response } from "express";
import { AuthRequest } from "../middlewares/auth.middleware";
import DonationService from "../services/donation.service";
import {
  createDonationSchema,
  updateDonationSchema,
} from "../validations/donation";
import { AppError } from "../errors/app-error";

export default class DonationController {
  private donationService: DonationService;

  constructor(donationService: DonationService) {
    this.donationService = donationService;
  }

  createDonation = async (req: AuthRequest, res: Response) => {
    const { error, value } = createDonationSchema.validate(req.body);
    console.log(value);
    if (error) {
      res.status(400).json({ error: error.details[0].message });
      return;
    }
    try {
      /**
       * The logged user is the donor, so we set the donor field
       * to the logged user's ID which is stored via the middleware
       */
      const donor = (req as any).user.id;
      const donation = await this.donationService.createDonation(value, donor);

      res.status(201).json(donation);
      return;
    } catch (error: any) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ error: error.message });
        return;
      }
      res.status(500).json({ error: "Internal server error" });
      return;
    }
  };

  getAllDonations = async (req: AuthRequest, res: Response) => {
    const donations = await this.donationService.getAllDonations();
    res.json(donations);
    return;
  };

  getDonationById = async (req: AuthRequest, res: Response) => {
    try {
      const donationId = req.params.id;
      const donation = await this.donationService.getDonationById(donationId);
      res.json(donation);
      return;
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ error: error.message });
        return;
      }
      res.status(500).json({ error: "Internal server error" });
      return;
    }
  };

  updateDonation = async (req: AuthRequest, res: Response) => {
    try {
      const { error, value } = updateDonationSchema.validate(req.body);
      if (error) {
        res.status(400).json({ error: error.details[0].message });
        return;
      }

      const donation = await this.donationService.updateDonation(
        req.params.id,
        value,
      );
      res.json(donation);
      return;
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ error: error.message });
        return;
      }
      res.status(500).json({ error: "Internal server error" });
      return;
    }
  };

  deleteDonation = async (req: AuthRequest, res: Response) => {
    try {
      const donationId = req.params.id;
      const userId = (req as any).user.id;
      await this.donationService.deleteDonation(donationId, userId);
      res.status(204).json({ message: "Donation deleted" });
      return;
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ error: error.message });
        return;
      }
      res.status(500).json({ error: "Internal server error" });
      return;
    }
  };

  getMyDonations = async (req: AuthRequest, res: Response) => {
    try {
      const userId = (req as any).user.id;
      const donations = await this.donationService.getMyDonations(userId);
      res.json(donations);
      return;
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ error: error.message });
        return;
      }
      res.status(500).json({ error: "Internal server error" });
      return;
    }
  };

  getDonationOverview = async (req: AuthRequest, res: Response) => {
    try {
      const overview = await this.donationService.getDonationOverview();
      res.json(overview);
      return;
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ error: error.message });
        return;
      }
      res.status(500).json({ error: "Internal server error" });
      return;
    }
  };
}
