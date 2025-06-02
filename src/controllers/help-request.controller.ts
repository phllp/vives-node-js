import { NextFunction, Response } from "express";
import HelpRequestService from "../services/help-request.service";
import { AuthRequest } from "../middlewares/auth.middleware";
import {
  createHelpRequestSchema,
  updateHelpRequestSchema,
} from "../validations/help-request";
import { ValidationError } from "../errors/validation-error";

export default class HelpRequestController {
  private helpRequestService: HelpRequestService;
  constructor(helpRequestService: HelpRequestService) {
    this.helpRequestService = helpRequestService;
  }

  createHelpRequest = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { error, value } = createHelpRequestSchema.validate(req.body);
      if (error) {
        throw new ValidationError(error.details[0].message);
      }
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
    } catch (error: any) {
      next(error);
    }
  };

  getAllHelpRequests = async (
    _req: AuthRequest,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const helpRequests = await this.helpRequestService.getAllHelpRequests();
      res.json(helpRequests);
    } catch (error) {
      next(error);
    }
  };

  getHelpRequestById = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const helpRequest = await this.helpRequestService.getHelpRequestById(
        req.params.id,
      );
      res.json(helpRequest);
    } catch (error) {
      next(error);
    }
  };

  updateHelpRequest = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { error, value } = updateHelpRequestSchema.validate(req.body);
      if (error) {
        throw new ValidationError(error.details[0].message);
      }

      const requesterId = (req as any).user.id;
      const helpRequest = await this.helpRequestService.updateHelpRequest(
        req.params.id,
        value,
        requesterId,
      );
      res.json(helpRequest);
    } catch (error) {
      next(error);
    }
  };

  deleteHelpRequest = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const requesterId = (req as any).user.id;
      const helpRequestId = req.params.id;
      await this.helpRequestService.deleteHelpRequest(
        helpRequestId,
        requesterId,
      );
      res.status(204).json({ message: "Help Request deleted" });
    } catch (error) {
      next(error);
    }
  };

  getOpenHelpRequests = async (
    _req: AuthRequest,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const helpRequests = await this.helpRequestService.getOpenHelpRequests();
      res.json(helpRequests);
    } catch (error) {
      next(error);
    }
  };

  getMyHelpRequests = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const requesterId = (req as any).user.id;
      const helpRequests =
        await this.helpRequestService.getHelpRequestsByRequesterId(requesterId);
      res.json(helpRequests);
    } catch (error) {
      next(error);
    }
  };
}
