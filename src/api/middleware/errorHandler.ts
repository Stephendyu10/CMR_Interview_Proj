import { Request, Response, NextFunction } from "express";
export function errorHandler(
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.error(error);

  if (error instanceof Error) {
    if (
        error.message ===
            "Request can only be sent from DRAFT status" ||
        error.message ===
            "Request can only be completed from SENT status"
    ) {
      return res.status(409).json({
        error: error.message,
      });
    }
  }

  return res.status(500).json({
    error: "Internal server error",
  });
}
