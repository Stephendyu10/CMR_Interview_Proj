import { createFirm } from "../db/queries/firms";
import { createUser } from "../db/queries/users";
import { createClient } from "../db/queries/clients";
import {
  createEngagementForUser,
  getEngagementsForUser,
} from "./engagementService";

async function main() {
  const firm = await createFirm("Engagement Test Firm");

  const user = await createUser(
    firm.id,
    "Stephen",
    "engagement@testfirm.com",
    "ADMIN",
  );

  const client = await createClient(
    firm.id,
    "Acme Corporation",
    "acme@test.com",
    "555-123-4567",
  );

  const engagement = await createEngagementForUser(
    user.id,
    client.id,
    "2025 Tax Return",
    "TAX_RETURN",
    2025,
  );

  console.log("Engagement created:");
  console.log(engagement);

  const engagements = await getEngagementsForUser(
    user.id,
    client.id,
  );

  console.log("\nEngagements:");
  console.log(engagements);

  process.exit(0);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
