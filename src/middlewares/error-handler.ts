import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { AppError } from "../shared/errors/app-error";

export function errorHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      error: error.message,
    });
  }

  if (error instanceof ZodError) {
    return res.status(400).json({
      error: "Validation error",
      details: error.errors,
    });
  }

  console.error(error);

  return res.status(500).json({
    error: "Internal server error",
  });
}
