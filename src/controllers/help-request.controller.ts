import { Response } from "express";
import HelpRequestService from "../services/help-request.service";
import { AuthRequest } from "../middlewares/auth.middleware";
import {
  createHelpRequestSchema,
  updateHelpRequestSchema,
} from "../validations/help-request";
import { HelpRequest } from "../models/help-request.model";

export default class HelpRequestController {
  private helpRequestService: HelpRequestService;
  constructor(helpRequestService: HelpRequestService) {
    this.helpRequestService = helpRequestService;
  }

  async createHelpRequest(req: AuthRequest, res: Response) {
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
      const helpRequest = await HelpRequest.create({
        ...value,
        requester: (req as any).user.id,
      });

      res.status(201).json(helpRequest);
      return;
    } catch (error) {
      res.status(400).json({ message: "Error creating Help Request", error });
      return;
    }
  }

  async getAllHelpRequests(_req: AuthRequest, res: Response) {
    const helpRequests = await HelpRequest.find().populate("requester", "name");
    res.json(helpRequests);
    return;
  }

  async getHelpRequestById(req: AuthRequest, res: Response) {
    const helpRequest = await HelpRequest.findById(req.params.id).populate(
      "requester",
      "name",
    );
    if (!helpRequest) {
      res.status(404).json({ message: "Help Request not found" });
      return;
    }
    res.json(helpRequest);
    return;
  }

  async updateHelpRequest(req: AuthRequest, res: Response) {
    const { error, value } = updateHelpRequestSchema.validate(req.body);
    if (error) {
      res.status(400).json({ error: error.details[0].message });
      return;
    }
    const helpRequest = await HelpRequest.findByIdAndUpdate(
      req.params.id,
      value,
      {
        new: true,
      },
    );
    if (!helpRequest) {
      res.status(404).json({ message: "Help Request not found" });
      return;
    }
    res.json(helpRequest);
    return;
  }

  async deleteHelpRequest(req: AuthRequest, res: Response) {
    const helpRequest = await HelpRequest.findById(req.params.id);
    if (!helpRequest) {
      res.status(404).json({ message: "Help Request not found" });
      return;
    }

    await helpRequest.deleteOne();
    res.status(204).send();
    return;
  }
}
