import express from "express";
import DonationController from "../controllers/donation.controller";
import DonationService from "../services/donation.service";
import { authenticate } from "../middlewares/auth.middleware";

const donationService = new DonationService();
const donationController = new DonationController(donationService);

const router = express.Router();

router.post("/", authenticate, donationController.createDonation);
router.get("/", donationController.getAllDonations);
router.get("/my", authenticate, donationController.getMyDonations);
router.get("/:id", donationController.getDonationById);
router.put("/:id", authenticate, donationController.updateDonation);
router.delete("/:id", authenticate, donationController.deleteDonation);
router.get("/analytics/overview", donationController.getDonationOverview);
export default router;
