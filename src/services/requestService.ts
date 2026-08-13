import { getUserById } from "../db/queries/users";
import { getClientByIdForFirm } from "../db/queries/clients";
import { getEngagementByIdForFirm } from "../db/queries/engagements";

import {
  createRequest,
  getRequestsByEngagement,
  getRequestByIdForFirm,
  updateRequestForFirm,
  deleteRequestForFirm,
} from "../db/queries/requests";

export async function createRequestForUser(
  userId: string,
  clientId: string,
  engagementId: string,
  title: string,
  description?: string,
  assignedToUserId?: string,
  dueDate?: string,
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

  if (assignedToUserId) {
    const assignedUser = await getUserById(assignedToUserId);

    if (!assignedUser) {
      return null;
    }

    if (assignedUser.firmId !== user.firmId) {
      return null;
    }
  }

  return createRequest(
    user.firmId,
    clientId,
    engagementId,
    title,
    description,
    assignedToUserId,
    dueDate,
  );
}

export async function getRequestsForUser(
  userId: string,
  clientId: string,
  engagementId: string,
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

  return getRequestsByEngagement(
    engagementId,
    user.firmId,
  );
}

export async function updateRequestForUser(
  userId: string,
  clientId: string,
  engagementId: string,
  requestId: string,
  data: {
    title?: string;
    description?: string | null;
    status?: string;
    assignedToUserId?: string | null;
    dueDate?: string | null;
    sentAt?: Date | null;
    completedAt?: Date | null;
  },
) {
  const user = await getUserById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  const request = await getRequestByIdForFirm(
    requestId,
    user.firmId,
  );

  if (!request) {
    return null;
  }

  if (request.clientId !== clientId) {
    return null;
  }

  if (request.engagementId !== engagementId) {
    return null;
  }

  if (data.assignedToUserId) {
    const assignedUser = await getUserById(
      data.assignedToUserId,
    );

    if (!assignedUser) {
      return null;
    }

    if (assignedUser.firmId !== user.firmId) {
      return null;
    }
  }

  return updateRequestForFirm(
    requestId,
    user.firmId,
    data,
  );
}

export async function deleteRequestForUser(
  userId: string,
  clientId: string,
  engagementId: string,
  requestId: string,
) {
  const user = await getUserById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  const request = await getRequestByIdForFirm(
    requestId,
    user.firmId,
  );

  if (!request) {
    return null;
  }

  if (request.clientId !== clientId) {
    return null;
  }

  if (request.engagementId !== engagementId) {
    return null;
  }

  return deleteRequestForFirm(
    requestId,
    user.firmId,
  );
}
