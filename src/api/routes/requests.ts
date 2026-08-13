import { Router } from "express";

import { requireUser } from "../middleware/auth";

import {
  createRequestSchema,
  updateRequestSchema,
} from "../../validation/requestsSchema";

import {
  createRequestForUser,
  getRequestsForUser,
  updateRequestForUser,
  deleteRequestForUser,
} from "../../services/requestService";

const router = Router();

router.use(requireUser);

// GET /clients/:clientId/engagements/:engagementId/requests
router.get(
  "/:clientId/engagements/:engagementId/requests",
  async (req, res, next) => {
    try {
      const { clientId, engagementId } = req.params;

      const requests = await getRequestsForUser(
        req.user!.id,
        clientId,
        engagementId,
      );

      if (!requests) {
        return res.status(404).json({
          error: "Client or engagement not found",
        });
      }

      return res.json(requests);
    } catch (error) {
      next(error);
    }
  },
);

// POST /clients/:clientId/engagements/:engagementId/requests
router.post(
  "/:clientId/engagements/:engagementId/requests",
  async (req, res, next) => {
    try {
      const { clientId, engagementId } = req.params;

      const result = createRequestSchema.safeParse(req.body);

      if (!result.success) {
        return res.status(400).json({
          error: "Invalid request data",
          details: result.error.flatten(),
        });
      }

      const request = await createRequestForUser(
        req.user!.id,
        clientId,
        engagementId,
        result.data.title,
        result.data.description,
        result.data.assignedToUserId,
        result.data.dueDate,
      );

      if (!request) {
        return res.status(404).json({
          error: "Client or engagement not found",
        });
      }

      return res.status(201).json(request);
    } catch (error) {
      next(error);
    }
  },
);

// PATCH /clients/:clientId/engagements/:engagementId/requests/:requestId
router.patch(
  "/:clientId/engagements/:engagementId/requests/:requestId",
  async (req, res, next) => {
    try {
      const {
        clientId,
        engagementId,
        requestId,
      } = req.params;

      const result = updateRequestSchema.safeParse(req.body);

      if (!result.success) {
        return res.status(400).json({
          error: "Invalid request data",
          details: result.error.flatten(),
        });
      }

      const request = await updateRequestForUser(
        req.user!.id,
        clientId,
        engagementId,
        requestId,
        result.data,
      );

      if (!request) {
        return res.status(404).json({
          error: "Request not found",
        });
      }

      return res.json(request);
    } catch (error) {
      next(error);
    }
  },
);

// DELETE /clients/:clientId/engagements/:engagementId/requests/:requestId
router.delete(
  "/:clientId/engagements/:engagementId/requests/:requestId",
  async (req, res, next) => {
    try {
      const {
        clientId,
        engagementId,
        requestId,
      } = req.params;

      const request = await deleteRequestForUser(
        req.user!.id,
        clientId,
        engagementId,
        requestId,
      );

      if (!request) {
        return res.status(404).json({
          error: "Request not found",
        });
      }

      return res.json({
        message: "Request deleted",
        request,
      });
    } catch (error) {
      next(error);
    }
  },
);

export default router;
