import { Request, Response, NextFunction } from "express";

import { getUserById } from "../../db/queries/users";

export async function requireUser(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const userId = req.header("x-user-id");

    if (!userId) {
      return res.status(401).json({
        error: "Authentication required",
      });
    }

    const user = await getUserById(userId);

    if (!user) {
      return res.status(401).json({
        error: "Invalid user",
      });
    }

    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
}
