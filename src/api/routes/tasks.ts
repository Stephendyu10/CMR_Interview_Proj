import { Router } from "express";

import { requireUser } from "../middleware/auth";

import {
  createTaskForUser,
  getTasksForUser,
  updateTaskForUser,
  deleteTaskForUser,
} from "../../services/taskService";

import {
  createTaskSchema,
  updateTaskSchema,
} from "../../validation/taskSchema";

const router = Router();

router.use(requireUser);

router.get(
  "/clients/:clientId/engagements/:engagementId/tasks",
  async (req, res) => {
    const { clientId, engagementId } = req.params;

    const tasks = await getTasksForUser(
      req.user!.id,
      clientId,
      engagementId,
    );

    if (!tasks) {
      return res.status(404).json({
        error: "Client or engagement not found",
      });
    }

    res.json(tasks);
  },
);

router.post(
  "/clients/:clientId/engagements/:engagementId/tasks",
  async (req, res) => {
    const { clientId, engagementId } = req.params;

    const result = createTaskSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        error: "Invalid request",
        details: result.error.flatten(),
      });
    }

    const {
      title,
      description,
      priority,
      assignedToUserId,
      dueDate,
    } = result.data;

    const task = await createTaskForUser(
      req.user!.id,
      clientId,
      engagementId,
      title,
      description,
      priority,
      assignedToUserId,
      dueDate,
    );

    if (!task) {
      return res.status(404).json({
        error: "Client or engagement not found",
      });
    }

    res.status(201).json(task);
  },
);

router.patch(
  "/clients/:clientId/engagements/:engagementId/tasks/:taskId",
  async (req, res) => {
    const {
      clientId,
      engagementId,
      taskId,
    } = req.params;

    const result = updateTaskSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        error: "Invalid request",
        details: result.error.flatten(),
      });
    }

    const task = await updateTaskForUser(
      req.user!.id,
      clientId,
      engagementId,
      taskId,
      result.data,
    );

    if (!task) {
      return res.status(404).json({
        error: "Task not found",
      });
    }

    res.json(task);
  },
);

router.delete(
  "/clients/:clientId/engagements/:engagementId/tasks/:taskId",
  async (req, res) => {
    const {
      clientId,
      engagementId,
      taskId,
    } = req.params;

    const task = await deleteTaskForUser(
      req.user!.id,
      clientId,
      engagementId,
      taskId,
    );

    if (!task) {
      return res.status(404).json({
        error: "Task not found",
      });
    }

    res.json({
      message: "Task deleted",
      task,
    });
  },
);

export default router;
