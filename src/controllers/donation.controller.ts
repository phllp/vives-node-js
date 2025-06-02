import { NextFunction, Response } from "express";
import { AuthRequest } from "../middlewares/auth.middleware";
import DonationService from "../services/donation.service";
import {
  createDonationSchema,
  updateDonationSchema,
} from "../validations/donation";
import { ValidationError } from "../errors/validation-error";

export default class DonationController {
  private donationService: DonationService;

  constructor(donationService: DonationService) {
    this.donationService = donationService;
  }

  createDonation = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { error, value } = createDonationSchema.validate(req.body);
      if (error) {
        throw new ValidationError(error.details[0].message);
      }
      /**
       * The logged user is the donor, so we set the donor field
       * to the logged user's ID which is stored via the middleware
       */
      const donor = (req as any).user.id;
      const donation = await this.donationService.createDonation(value, donor);

      res.status(201).json(donation);
      return;
    } catch (error: any) {
      next(error);
    }
  };

  getAllDonations = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const donations = await this.donationService.getAllDonations();
      res.json(donations);
    } catch (error) {
      next(error);
    }
  };

  getDonationById = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const donationId = req.params.id;
      const donation = await this.donationService.getDonationById(donationId);
      res.json(donation);
      return;
    } catch (error) {
      next(error);
    }
  };

  updateDonation = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { error, value } = updateDonationSchema.validate(req.body);
      if (error) {
        throw new ValidationError(error.details[0].message);
      }

      const donation = await this.donationService.updateDonation(
        req.params.id,
        value,
      );
      res.json(donation);
      return;
    } catch (error) {
      next(error);
    }
  };

  deleteDonation = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const donationId = req.params.id;
      const userId = (req as any).user.id;
      await this.donationService.deleteDonation(donationId, userId);
      res.status(204).json({ message: "Donation deleted" });
      return;
    } catch (error) {
      next(error);
    }
  };

  getMyDonations = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const userId = (req as any).user.id;
      const donations = await this.donationService.getMyDonations(userId);
      res.json(donations);
      return;
    } catch (error) {
      next(error);
    }
  };

  getDonationOverview = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const overview = await this.donationService.getDonationOverview();
      res.json(overview);
      return;
    } catch (error) {
      next(error);
    }
  };
}
