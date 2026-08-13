import { eq, and } from "drizzle-orm";
import { db } from "../index";
import { tasks } from "../schema";

export async function createTask(
  firmId: string,
  clientId: string,
  engagementId: string,
  title: string,
  description?: string,
  priority: string = "NORMAL",
  assignedToUserId?: string,
  dueDate?: string,
) {
  const [task] = await db
    .insert(tasks)
    .values({
      firmId,
      clientId,
      engagementId,
      title,
      description,
      priority,
      assignedToUserId,
      dueDate,
    })
    .returning();

  return task;
}

export async function getTasksByEngagement(
  engagementId: string,
) {
  return db
    .select()
    .from(tasks)
    .where(eq(tasks.engagementId, engagementId));
}

export async function updateTask(
  taskId: string,
  values: Partial<{
    title: string;
    description: string;
    status: string;
    priority: string;
    assignedToUserId: string | null;
    dueDate: string | null;
    completedAt: Date | null;
  }>,
) {
  const [task] = await db
    .update(tasks)
    .set({
      ...values,
      updatedAt: new Date(),
    })
    .where(eq(tasks.id, taskId))
    .returning();

  return task ?? null;
}

export async function deleteTask(taskId: string) {
  const [task] = await db
    .delete(tasks)
    .where(eq(tasks.id, taskId))
    .returning();

  return task ?? null;
}
