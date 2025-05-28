import express from "express";
import HelpRequestController from "../controllers/help-request.controller";
import HelpRequestService from "../services/help-request.service";
import { authenticate } from "../middlewares/auth.middleware";

const helpReqService = new HelpRequestService();
const helpReqController = new HelpRequestController(helpReqService);

const router = express.Router();

router.post("/", authenticate, helpReqController.createHelpRequest);
router.get("/", helpReqController.getAllHelpRequests);
router.get("/open", helpReqController.getOpenHelpRequests);
router.get("/my", authenticate, helpReqController.getMyHelpRequests);
router.get("/:id", helpReqController.getHelpRequestById);
router.put("/:id", authenticate, helpReqController.updateHelpRequest);
router.delete("/:id", authenticate, helpReqController.deleteHelpRequest);

export default router;
