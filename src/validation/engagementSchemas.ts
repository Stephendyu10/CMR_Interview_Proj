import { z } from "zod";

export const createEngagementSchema = z.object({
  name: z.string().min(1),
  type: z.string().min(1),
  taxYear: z.number().int().min(2000).max(2100).optional(),
});

export const updateEngagementSchema = z.object({
    name: z.string().min(1).optional(),
    type: z.string().min(1).optional(),
    taxYear: z.number().int().min(2000).max(2100).optional(),
    status: z.string().min(1).optional(),
});
