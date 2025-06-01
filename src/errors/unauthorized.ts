import { AppError } from "./app-error";

export class UnauthorizedError extends AppError {
  constructor(msg = "Forbidden") {
    super(msg, 403);
  }
}
