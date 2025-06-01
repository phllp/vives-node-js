import { AppError } from "./app-error";

export class DonationError extends AppError {
  constructor(message = "Error processing donation") {
    super(message, 400);
  }
}
