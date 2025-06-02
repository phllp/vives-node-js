import { ErrorRequestHandler } from "express";
import { AppError } from "../errors/app-error";

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
  } else {
    console.error("Unexpected error:", err);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};
