import HelpRequestService from "../services/help-request.service";

export class HelpRequestController {
  private helpRequestService: HelpRequestService;
  constructor(helpRequestService: HelpRequestService) {
    this.helpRequestService = helpRequestService;
  }
}
