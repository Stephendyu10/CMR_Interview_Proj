import {
  createEngagement,
  getEngagementsByClient,
} from "./queries/engagements";

async function main() {
  const clientId = "2eb71a6b-b64f-4110-82d1-69a6e4bb7ad0";

  const engagement = await createEngagement(
    clientId,
    "2025 Individual Tax Return",
    "TAX_RETURN",
    2025,
  );

  console.log("Engagement created:");
  console.log(engagement);

  const engagements = await getEngagementsByClient(clientId);

  console.log("Engagements for client:");
  console.log(engagements);

  process.exit(0);
}

main();
