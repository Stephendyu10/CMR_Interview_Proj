import { db } from "../index";
import {eq} from "drizzle-orm";
import { users } from "../schema";

export async function createUser(
  firmId: string,
  name: string,
  email: string,
  role = "MEMBER",
) {
  const [user] = await db
    .insert(users)
    .values({
      firmId,
      name,
      email,
      role,
    })
    .returning();

  return user;
}

export async function getUserById(userId: string){
    const [user] = await db
        .select()
        .from(users)
        .where(eq(users.id, userId))
        .limit(1);
    return user;
}
