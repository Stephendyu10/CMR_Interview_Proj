import { getUserById } from "../db/queries/users";
import { getClientsByFirm } from "../db/queries/clients";
import {
    createEngagement,
    getEngagementsByClient,
    updateEngagement,
    deleteEngagement,
} from "../db/queries/engagements";

export async function createEngagementForUser(
  userId: string,
  clientId: string,
  name: string,
  type: string,
  taxYear?: number,
) {
  const user = await getUserById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  const clients = await getClientsByFirm(user.firmId);

  const clientBelongsToFirm = clients.some(
    (client) => client.id === clientId,
  );

  if (!clientBelongsToFirm) {
    return null;
  }

  return createEngagement(clientId, name, type, taxYear,);
}

export async function getEngagementsForUser(
  userId: string,
  clientId: string,
) {
  const user = await getUserById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  const clients = await getClientsByFirm(user.firmId);

  const clientBelongsToFirm = clients.some(
    (client) => client.id === clientId,
  );

  if (!clientBelongsToFirm) {
        return null;
  }

  return getEngagementsByClient(clientId);
}
export async function updateEngagementForUser(
  userId: string,
  clientId: string,
  engagementId: string,
  data: {
    name?: string;
    type?: string;
    taxYear?: number;
    status?: string;
  },
) {
  const user = await getUserById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  const clients = await getClientsByFirm(user.firmId);

  const clientBelongsToFirm = clients.some(
    (client) => client.id === clientId,
  );

  if (!clientBelongsToFirm) {
    return null;
  }

  const engagements = await getEngagementsByClient(clientId);

  const engagementBelongsToClient = engagements.some(
    (engagement) => engagement.id === engagementId,
  );

  if (!engagementBelongsToClient) {
    return null;
  }

  return updateEngagement(engagementId, data);
}
export async function deleteEngagementForUser(
  userId: string,
  clientId: string,
  engagementId: string,
) {
  const user = await getUserById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  const clients = await getClientsByFirm(user.firmId);

  const clientBelongsToFirm = clients.some(
    (client) => client.id === clientId,
  );

  if (!clientBelongsToFirm) {
    return null;
  }

  const engagements = await getEngagementsByClient(clientId);

  const engagementBelongsToClient = engagements.some(
    (engagement) => engagement.id === engagementId,
  );

  if (!engagementBelongsToClient) {
    return null;
  }

  return deleteEngagement(engagementId);
}
