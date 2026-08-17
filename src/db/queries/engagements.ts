import { and, eq, inArray } from "drizzle-orm";

import { db } from "../index";
import { clients, engagements } from "../schema";

export type EngagementUpdate = {
  name?: string;
  type?: string;
  taxYear?: number;
  status?: "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED";
};

export async function createEngagement(
  clientId: string,
  name: string,
  type: string,
  taxYear?: number,
) {
  const [engagement] = await db
    .insert(engagements)
    .values({
      clientId,
      name,
      type,
      taxYear,
    })
    .returning();

  return engagement;
}

export async function getEngagementsByClientForFirm(
  clientId: string,
  firmId: string,
) {
  return db
    .select({
      id: engagements.id,
      clientId: engagements.clientId,
      name: engagements.name,
      type: engagements.type,
      taxYear: engagements.taxYear,
      status: engagements.status,
      createdAt: engagements.createdAt,
      updatedAt: engagements.updatedAt,
    })
    .from(engagements)
    .innerJoin(
      clients,
      eq(engagements.clientId, clients.id),
    )
    .where(
      and(
        eq(engagements.clientId, clientId),
        eq(clients.firmId, firmId),
      ),
    );
}

export async function getEngagementByIdForFirm(
  engagementId: string,
  firmId: string,
) {
  const [engagement] = await db
    .select({
      id: engagements.id,
      clientId: engagements.clientId,
      name: engagements.name,
      type: engagements.type,
      taxYear: engagements.taxYear,
      status: engagements.status,
      createdAt: engagements.createdAt,
      updatedAt: engagements.updatedAt,
    })
    .from(engagements)
    .innerJoin(
      clients,
      eq(engagements.clientId, clients.id),
    )
    .where(
      and(
        eq(engagements.id, engagementId),
        eq(clients.firmId, firmId),
      ),
    )
    .limit(1);

  return engagement ?? null;
}

export async function updateEngagementForFirm(
  engagementId: string,
  firmId: string,
  data: EngagementUpdate,
) {
  const clientIdsForFirm = db
    .select({
      id: clients.id,
    })
    .from(clients)
    .where(eq(clients.firmId, firmId));

  const [engagement] = await db
    .update(engagements)
    .set({
      ...data,
      updatedAt: new Date(),
    })
    .where(
      and(
        eq(engagements.id, engagementId),
        inArray(
          engagements.clientId,
          clientIdsForFirm,
        ),
      ),
    )
    .returning();

  return engagement ?? null;
}

export async function deleteEngagementForFirm(
  engagementId: string,
  firmId: string,
) {
  const clientIdsForFirm = db
    .select({
      id: clients.id,
    })
    .from(clients)
    .where(eq(clients.firmId, firmId));

  const [engagement] = await db
    .delete(engagements)
    .where(
      and(
        eq(engagements.id, engagementId),
        inArray(
          engagements.clientId,
          clientIdsForFirm,
        ),
      ),
    )
    .returning();

  return engagement ?? null;
}
