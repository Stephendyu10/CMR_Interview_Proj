import { db } from "../index";
import { firms } from "../schema";

export async function createFirm(name: string) {
  const [firm] = await db
    .insert(firms)
    .values({
      name,
    })
    .returning();

  return firm;
}
