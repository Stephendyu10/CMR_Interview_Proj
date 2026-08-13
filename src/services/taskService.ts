import { getUserById } from "../db/queries/users";

import {
  createTask,
  getTasksByEngagementForFirm,
  getTaskByIdForFirm,
  updateTaskForFirm,
  deleteTaskForFirm,
  type TaskUpdate,
} from "../db/queries/tasks";

import { getEngagementByIdForFirm } from "../db/queries/engagements";

export async function createTaskForUser(
  userId: string,
  clientId: string,
  engagementId: string,
  title: string,
  description?: string,
  priority: string = "NORMAL",
  assignedToUserId?: string,
  dueDate?: string,
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

  return createTask(
    user.firmId,
    clientId,
    engagementId,
    title,
    description,
    priority,
    assignedToUserId,
    dueDate,
  );
}

export async function getTasksForUser(
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

  return getTasksByEngagementForFirm(
    engagementId,
    user.firmId,
  );
}

export async function updateTaskForUser(
  userId: string,
  clientId: string,
  engagementId: string,
  taskId: string,
  values: TaskUpdate,
) {
  const user = await getUserById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  const task = await getTaskByIdForFirm(
    taskId,
    user.firmId,
  );

  if (!task) {
    return null;
  }

  if (task.clientId !== clientId) {
    return null;
  }

  if (task.engagementId !== engagementId) {
    return null;
  }

  return updateTaskForFirm(
    taskId,
    user.firmId,
    values,
  );
}

export async function deleteTaskForUser(
  userId: string,
  clientId: string,
  engagementId: string,
  taskId: string,
) {
  const user = await getUserById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  const task = await getTaskByIdForFirm(
    taskId,
    user.firmId,
  );

  if (!task) {
    return null;
  }

  if (task.clientId !== clientId) {
    return null;
  }

  if (task.engagementId !== engagementId) {
    return null;
  }

  return deleteTaskForFirm(
    taskId,
    user.firmId,
  );
}
