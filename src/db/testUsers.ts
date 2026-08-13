import { createUser } from "./queries/users";

async function main() {
  const user = await createUser(
    "d1882495-81d7-4bdc-a76b-57f5f69afff5",
    "Stephen",
    "stephen@example.com",
    "ADMIN",
  );

  console.log(user);
    
  process.exit(0);
}

main();
