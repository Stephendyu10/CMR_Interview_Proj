import { getUserById } from "../db/queries/users";
import { getClientsByFirm } from "../db/queries/clients";
import {
  createTask,
  getTasksByEngagement,
  updateTask,
  deleteTask,
} from "../db/queries/tasks";
import { getEngagementsByClient } from "../db/queries/engagements";

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

  const clients = await getClientsByFirm(user.firmId);

  const client = clients.find(
    (client) => client.id === clientId,
  );

  if (!client) {
    return null;
  }

  const engagements = await getEngagementsByClient(clientId);

  const engagement = engagements.find(
    (engagement) => engagement.id === engagementId,
  );

  if (!engagement) {
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

  const clients = await getClientsByFirm(user.firmId);

  const client = clients.find(
    (client) => client.id === clientId,
  );

  if (!client) {
    return null;
  }

  const engagements = await getEngagementsByClient(clientId);

  const engagement = engagements.find(
    (engagement) => engagement.id === engagementId,
  );

  if (!engagement) {
    return null;
  }

  return getTasksByEngagement(engagementId);
}

export async function updateTaskForUser(
  userId: string,
  clientId: string,
  engagementId: string,
  taskId: string,
  values: Parameters<typeof updateTask>[1],
) {
  const user = await getUserById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  const clients = await getClientsByFirm(user.firmId);

  const client = clients.find(
    (client) => client.id === clientId,
  );

  if (!client) {
    return null;
  }

  const engagements = await getEngagementsByClient(clientId);

  const engagement = engagements.find(
    (engagement) => engagement.id === engagementId,
  );

  if (!engagement) {
    return null;
  }

  const taskList = await getTasksByEngagement(engagementId);

  const task = taskList.find(
    (task) => task.id === taskId,
  );

  if (!task) {
    return null;
  }

  return updateTask(taskId, values);
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

  const clients = await getClientsByFirm(user.firmId);

  const client = clients.find(
    (client) => client.id === clientId,
  );

  if (!client) {
    return null;
  }

  const engagements = await getEngagementsByClient(clientId);

  const engagement = engagements.find(
    (engagement) => engagement.id === engagementId,
  );

  if (!engagement) {
    return null;
  }

  const taskList = await getTasksByEngagement(engagementId);

  const task = taskList.find(
    (task) => task.id === taskId,
  );

  if (!task) {
    return null;
  }

  return deleteTask(taskId);
}
