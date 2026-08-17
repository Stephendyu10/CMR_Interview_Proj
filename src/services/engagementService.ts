import { getUserById } from "../db/queries/users";
import { getClientByIdForFirm } from "../db/queries/clients";

import {
    createEngagement,
    getEngagementsByClientForFirm,
    getEngagementByIdForFirm,
    updateEngagementForFirm,
    deleteEngagementForFirm,
    type EngagementUpdate,
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

  const client = await getClientByIdForFirm(
    clientId,
    user.firmId,
  );

  if (!client) {
    return null;
  }

  return createEngagement(
    clientId,
    name,
    type,
    taxYear,
  );
}

export async function getEngagementsForUser(
  userId: string,
  clientId: string,
) {
    const user = await getUserById(userId);

    if (!user) {
        throw new Error("User not found");
    }
    const client = await getClientByIdForFirm(
        clientId,
        user.firmId,
    );
    if (!client){
        return null;
    }
    return getEngagementsByClientForFirm(
        clientId,
        user.firmId,
    );
}

export async function updateEngagementForUser(
  userId: string,
  clientId: string,
  engagementId: string,
  data: EngagementUpdate,
) {
  const user = await getUserById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  const engagement = await getEngagementByIdForFirm(
    engagementId,
    user.firmId,
  );

  if (!engagement) {
    return null;
  }

  if (engagement.clientId !== clientId) {
    return null;
  }

  return updateEngagementForFirm(
    engagementId,
    user.firmId,
    data,
  );
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

  const engagement = await getEngagementByIdForFirm(
    engagementId,
    user.firmId,
  );

  if (!engagement) {
    return null;
  }

  if (engagement.clientId !== clientId) {
    return null;
  }

  return deleteEngagementForFirm(
    engagementId,
    user.firmId,
  );
}
