import { z } from "zod";

export const clientStatusSchema = z.enum([
  "ACTIVE",
  "INACTIVE",
]);

export const createClientSchema = z.object({
  name: z.string().min(1),
  email: z.string().email().optional(),
  phone: z.string().optional(),
});

export const updateClientSchema = z.object({
  name: z.string().min(1).optional(),
  email: z.string().email().nullable().optional(),
  phone: z.string().nullable().optional(),
  status: clientStatusSchema.optional(),
});
