import { and, eq } from "drizzle-orm";
import { db } from "../index";
import { clients } from "../schema";

type ClientUpdate = {
  name?: string;
  email?: string | null;
  phone?: string | null;
  status?: "ACTIVE" | "INACTIVE";
};

export async function createClient(
  firmId: string,
  name: string,
  email?: string,
  phone?: string,
) {
  const [client] = await db
    .insert(clients)
    .values({
      firmId,
      name,
      email,
      phone,
    })
    .returning();

  return client;
}

export async function getClientsByFirm(firmId: string) {
  return db
    .select()
    .from(clients)
    .where(eq(clients.firmId, firmId));
}

export async function getClientByIdForFirm(
  clientId: string,
  firmId: string,
) {
  const [client] = await db
    .select()
    .from(clients)
    .where(
      and(
        eq(clients.id, clientId),
        eq(clients.firmId, firmId),
      ),
    )
    .limit(1);

  return client;
}

export async function updateClientForFirm(
  clientId: string,
  firmId: string,
  data: ClientUpdate,
) {
  const [client] = await db
    .update(clients)
    .set({
      ...data,
      updatedAt: new Date(),
    })
    .where(
      and(
        eq(clients.id, clientId),
        eq(clients.firmId, firmId),
      ),
    )
    .returning();

  return client;
}

export async function deleteClientForFirm(
  clientId: string,
  firmId: string,
) {
  const [client] = await db
    .delete(clients)
    .where(
      and(
        eq(clients.id, clientId),
        eq(clients.firmId, firmId),
      ),
    )
    .returning();

  return client;
}
