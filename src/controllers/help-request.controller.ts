import { Response } from "express";
import HelpRequestService from "../services/help-request.service";
import { AuthRequest } from "../middlewares/auth.middleware";
import {
  createHelpRequestSchema,
  updateHelpRequestSchema,
} from "../validations/help-request";
import { AppError } from "../errors/app-error";

export default class HelpRequestController {
  private helpRequestService: HelpRequestService;
  constructor(helpRequestService: HelpRequestService) {
    this.helpRequestService = helpRequestService;
  }

  createHelpRequest = async (req: AuthRequest, res: Response) => {
    const { error, value } = createHelpRequestSchema.validate(req.body);
    if (error) {
      res.status(400).json({ error: error.details[0].message });
      return;
    }
    try {
      /**
       * The logged user is the user creating the request, so we set the "requester" field
       * to the logged user's ID which is stored via the middleware
       */
      const requesterId = (req as any).user.id;
      value.requester = requesterId;
      const helpRequest = await this.helpRequestService.createHelpRequest(
        value,
      );
      res.status(201).json(helpRequest);
      return;
    } catch (error: any) {
      res.status(400).json({ message: error.message });
      return;
    }
  };

  getAllHelpRequests = async (_req: AuthRequest, res: Response) => {
    try {
      const helpRequests = await this.helpRequestService.getAllHelpRequests();
      res.json(helpRequests);
      return;
    } catch (error) {
      res.status(500).json({
        message: "Error fetching Help Requests",
        error: error instanceof Error ? error.message : "Unknown error",
      });
      return;
    }
  };

  getHelpRequestById = async (req: AuthRequest, res: Response) => {
    try {
      const helpRequest = await this.helpRequestService.getHelpRequestById(
        req.params.id,
      );
      if (!helpRequest) {
        res.status(404).json({ message: "Help Request not found" });
        return;
      }
      res.json(helpRequest);
    } catch (error) {
      res.status(500).json({
        message: "Error fetching Help Request",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  };

  updateHelpRequest = async (req: AuthRequest, res: Response) => {
    const { error, value } = updateHelpRequestSchema.validate(req.body);
    if (error) {
      res.status(400).json({ error: error.details[0].message });
      return;
    }

    try {
      const requesterId = (req as any).user.id;
      const helpRequest = await this.helpRequestService.updateHelpRequest(
        req.params.id,
        value,
        requesterId,
      );
      res.json(helpRequest);
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ error: error.message });
        return;
      }
      res.status(500).json({ error: "Internal server error" });
    }
  };

  deleteHelpRequest = async (req: AuthRequest, res: Response) => {
    try {
      const requesterId = (req as any).user.id;
      const helpRequestId = req.params.id;
      await this.helpRequestService.deleteHelpRequest(
        helpRequestId,
        requesterId,
      );
      res.status(204).send();
      return;
    } catch (error) {
      if (
        error instanceof Error &&
        error.message === "You can only delete your own help requests"
      ) {
        res
          .status(400)
          .json({ message: "You can only delete your own help requests" });
        return;
      }
      if (
        error instanceof Error &&
        error.message === "Cannot delete a fulfilled help request"
      ) {
        res.status(400).json({
          message: "Cannot delete a fulfilled help request",
        });
        return;
      }
      res.status(500).json({
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  };

  getOpenHelpRequests = async (_req: AuthRequest, res: Response) => {
    try {
      const helpRequests = await this.helpRequestService.getOpenHelpRequests();
      res.json(helpRequests);
      return;
    } catch (error) {
      res.status(500).json({
        message: "Error fetching Open Help Requests",
        error: error instanceof Error ? error.message : "Unknown error",
      });
      return;
    }
  };

  getMyHelpRequests = async (req: AuthRequest, res: Response) => {
    try {
      const requesterId = (req as any).user.id;
      const helpRequests =
        await this.helpRequestService.getHelpRequestsByRequesterId(requesterId);
      res.json(helpRequests);
      return;
    } catch (error) {
      res.status(500).json({
        message: "Error fetching your Help Requests",
        error: error instanceof Error ? error.message : "Unknown error",
      });
      return;
    }
  };
}
