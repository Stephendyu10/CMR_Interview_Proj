import { createFirm } from "./queries/firms";

async function main() {
  const firm = await createFirm("Lucida Tax Solutions");

  console.log(firm);

  process.exit(0);
}

main();
