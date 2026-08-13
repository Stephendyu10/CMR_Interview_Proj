import { eq } from "drizzle-orm";
import { db } from "../index";
import { engagements } from "../schema";

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

export async function getEngagementsByClient(clientId: string) {
  return db
    .select()
    .from(engagements)
    .where(eq(engagements.clientId, clientId));
}

export async function updateEngagement(
  engagementId: string,
  data: {
    name?: string;
    type?: string;
    taxYear?: number;
    status?: string;
  },
) {
  const [engagement] = await db
    .update(engagements)
    .set({
      ...data,
      updatedAt: new Date(),
    })
    .where(eq(engagements.id, engagementId))
    .returning();

  return engagement ?? null;
}
export async function deleteEngagement(engagementId: string) {
  const [engagement] = await db
    .delete(engagements)
    .where(eq(engagements.id, engagementId))
    .returning();

  return engagement ?? null;
}


