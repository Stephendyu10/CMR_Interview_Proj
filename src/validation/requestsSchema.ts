import { z } from "zod";

export const requestStatusEnum = z.enum([
  "DRAFT",
  "SENT",
  "IN_PROGRESS",
  "COMPLETED",
]);

export const createRequestSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  assignedToUserId: z.string().uuid().optional(),
  dueDate: z.string().optional(),
});

export const updateRequestSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().nullable().optional(),
  status: requestStatusEnum.optional(),
  assignedToUserId: z.string().uuid().nullable().optional(),
  dueDate: z.string().nullable().optional(),
});
