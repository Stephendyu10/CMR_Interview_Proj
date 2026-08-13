import { createFirm } from "../db/queries/firms";
import { createUser, getUserById } from "../db/queries/users";
import { createClient } from "../db/queries/clients";
import { getClientsForUser } from "./clientService";

async function main() {
  // 1. Create a firm
  const firm = await createFirm("Test Accounting Firm");

  console.log("Firm created:");
  console.log(firm);

  // 2. Create a user belonging to the firm
  const user = await createUser(
    firm.id,
    "Stephen",
    "stephen@testfirm.com",
    "ADMIN",
  );

  console.log("\nUser created:");
  console.log(user);

  // 3. Test getUserById
  const foundUser = await getUserById(user.id);

  console.log("\ngetUserById:");
  console.log(foundUser);

  // 4. Create a client belonging to the same firm
  const client = await createClient(
    firm.id,
    "Acme Corporation",
    "contact@acme.com",
    "555-123-4567",
  );

  console.log("\nClient created:");
  console.log(client);

  // 5. Test the service layer
  const firmClients = await getClientsForUser(user.id);

  console.log("\ngetClientsForUser:");
  console.log(firmClients);

  process.exit(0);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
