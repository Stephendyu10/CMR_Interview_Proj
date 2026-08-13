import { Router } from "express";

import { requireUser } from "../middleware/auth";

import {
  createEngagementForUser,
  getEngagementsForUser,
  updateEngagementForUser,
  deleteEngagementForUser,
} from "../../services/engagementService";

import {
  createEngagementSchema,
  updateEngagementSchema,
} from "../../validation/engagementSchemas";

const router = Router();

router.use(requireUser);

router.get("/:clientId/engagements", async (req, res, next) => {
  try {
    const { clientId } = req.params;

    const engagements = await getEngagementsForUser(
      req.user!.id,
      clientId,
    );

    if (!engagements) {
      return res.status(404).json({
        error: "Client not found",
      });
    }

    return res.json(engagements);
  } catch (error) {
    next(error);
  }
});

router.post("/:clientId/engagements", async (req, res, next) => {
  try {
    const { clientId } = req.params;

    const result = createEngagementSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        error: "Invalid engagement data",
        details: result.error.flatten(),
      });
    }

    const engagement = await createEngagementForUser(
      req.user!.id,
      clientId,
      result.data.name,
      result.data.type,
      result.data.taxYear,
    );

    if (!engagement) {
      return res.status(404).json({
        error: "Client not found",
      });
    }

    return res.status(201).json(engagement);
  } catch (error) {
    next(error);
  }
});

router.patch(
  "/:clientId/engagements/:engagementId",
  async (req, res, next) => {
    try {
      const { clientId, engagementId } = req.params;

      const result = updateEngagementSchema.safeParse(req.body);

      if (!result.success) {
        return res.status(400).json({
          error: "Invalid engagement data",
          details: result.error.flatten(),
        });
      }

      const engagement = await updateEngagementForUser(
        req.user!.id,
        clientId,
        engagementId,
        result.data,
      );

      if (!engagement) {
        return res.status(404).json({
          error: "Engagement not found",
        });
      }

      return res.json(engagement);
    } catch (error) {
      next(error);
    }
  },
);

router.delete(
  "/:clientId/engagements/:engagementId",
  async (req, res, next) => {
    try {
      const { clientId, engagementId } = req.params;

      const engagement = await deleteEngagementForUser(
        req.user!.id,
        clientId,
        engagementId,
      );

      if (!engagement) {
        return res.status(404).json({
          error: "Engagement not found",
        });
      }

      return res.json({
        message: "Engagement deleted",
        engagement,
      });
    } catch (error) {
      next(error);
    }
  },
);

export default router;
