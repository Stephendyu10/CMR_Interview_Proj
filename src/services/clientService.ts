import {
    createClient,
    getClientsByFirm,
    getClientByIdForFirm,
    updateClientForFirm,
    deleteClientForFirm,
} from "../db/queries/clients";

import { getUserById } from "../db/queries/users";

export async function createClientForUser(
  userId: string,
  name: string,
  email?: string,
  phone?: string,
) {
  const user = await getUserById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  return createClient(
    user.firmId,
    name,
    email,
    phone,
  );
}

export async function getClientsForUser(userId: string) {
  const user = await getUserById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  return getClientsByFirm(user.firmId);
}

export async function getClientForUser(
  userId: string,
  clientId: string,
) {
  const user = await getUserById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  return getClientByIdForFirm(
    clientId,
    user.firmId,
  );
}

export async function updateClientForUser(
  userId: string,
  clientId: string,
  data: {
    name?: string;
    email?: string;
    phone?: string;
    status?: string;
  },
) {
  const user = await getUserById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  return updateClientForFirm(
    clientId,
    user.firmId,
    data,
  );
}
export async function deleteClientForUser(
  userId: string,
  clientId: string,
) {
  const user = await getUserById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  return deleteClientForFirm(
    clientId,
    user.firmId,
  );
}
