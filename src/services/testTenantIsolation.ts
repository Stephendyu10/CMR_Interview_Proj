import { createFirm } from "../db/queries/firms";
import { createUser } from "../db/queries/users";
import { createClient } from "../db/queries/clients";
import {
  createEngagementForUser,
  getEngagementsForUser,
} from "./engagementService";

async function main() {
  // -------------------------
  // Firm A
  // -------------------------
  const firmA = await createFirm("Firm A");

  const userA = await createUser(
    firmA.id,
    "User A",
    "usera@test.com",
    "ADMIN",
  );

  const clientA = await createClient(
    firmA.id,
    "Client A",
    "clienta@test.com",
  );

  // -------------------------
  // Firm B
  // -------------------------
  const firmB = await createFirm("Firm B");

  const userB = await createUser(
    firmB.id,
    "User B",
    "userb@test.com",
    "ADMIN",
  );

  const clientB = await createClient(
    firmB.id,
    "Client B",
    "clientb@test.com",
  );

  // -------------------------
  // Normal access should work
  // -------------------------
  const engagementA = await createEngagementForUser(
    userA.id,
    clientA.id,
    "Firm A Tax Return",
    "TAX_RETURN",
    2025,
  );

  console.log("Normal access succeeded:");
  console.log(engagementA);

  // -------------------------
  // Cross-tenant create should fail
  // -------------------------
  console.log("\nTesting cross-tenant create...");

  try {
    await createEngagementForUser(
      userA.id,
      clientB.id,
      "Unauthorized Tax Return",
      "TAX_RETURN",
      2025,
    );

    console.error("❌ SECURITY TEST FAILED");
    console.error("User A was able to access Firm B's client.");
  } catch (error) {
    console.log("✅ Cross-tenant create rejected.");
    console.log((error as Error).message);
  }

  // -------------------------
  // Cross-tenant read should fail
  // -------------------------
  console.log("\nTesting cross-tenant read...");

  try {
    await getEngagementsForUser(
      userA.id,
      clientB.id,
    );

    console.error("❌ SECURITY TEST FAILED");
    console.error("User A was able to read Firm B's client.");
  } catch (error) {
    console.log("✅ Cross-tenant read rejected.");
    console.log((error as Error).message);
  }

  // -------------------------
  // Firm B should still work
  // -------------------------
  const engagementB = await createEngagementForUser(
    userB.id,
    clientB.id,
    "Firm B Tax Return",
    "TAX_RETURN",
    2025,
  );

  console.log("\nFirm B access succeeded:");
  console.log(engagementB);

  process.exit(0);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
