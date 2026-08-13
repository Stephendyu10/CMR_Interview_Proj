import { z } from "zod";

export const createTaskSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  priority: z.string().min(1).default("NORMAL"),
  assignedToUserId: z.string().uuid().optional(),
  dueDate: z.string().optional(),
});

export const updateTaskSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().optional(),
  status: z.string().min(1).optional(),
  priority: z.string().min(1).optional(),
  assignedToUserId: z.string().uuid().nullable().optional(),
  dueDate: z.string().nullable().optional(),
});
