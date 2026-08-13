import { and, eq } from "drizzle-orm";

import { db } from "../index";
import { tasks } from "../schema";

export type TaskUpdate = {
  title?: string;
  description?: string;
  status?: string;
  priority?: string;
  assignedToUserId?: string | null;
  dueDate?: string | null;
  completedAt?: Date | null;
};

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

export async function getTasksByEngagementForFirm(
  engagementId: string,
  firmId: string,
) {
  return db
    .select()
    .from(tasks)
    .where(
      and(
        eq(tasks.engagementId, engagementId),
        eq(tasks.firmId, firmId),
      ),
    );
}

export async function getTaskByIdForFirm(
  taskId: string,
  firmId: string,
) {
  const [task] = await db
    .select()
    .from(tasks)
    .where(
      and(
        eq(tasks.id, taskId),
        eq(tasks.firmId, firmId),
      ),
    )
    .limit(1);

  return task ?? null;
}

export async function updateTaskForFirm(
  taskId: string,
  firmId: string,
  values: TaskUpdate,
) {
  const [task] = await db
    .update(tasks)
    .set({
      ...values,
      updatedAt: new Date(),
    })
    .where(
      and(
        eq(tasks.id, taskId),
        eq(tasks.firmId, firmId),
      ),
    )
    .returning();

  return task ?? null;
}

export async function deleteTaskForFirm(
  taskId: string,
  firmId: string,
) {
  const [task] = await db
    .delete(tasks)
    .where(
      and(
        eq(tasks.id, taskId),
        eq(tasks.firmId, firmId),
      ),
    )
    .returning();

  return task ?? null;
}
