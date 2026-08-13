import { createClient, getClientsByFirm } from "./queries/clients";

async function main() {
    const firmId = "d1882495-81d7-4bdc-a76b-57f5f69afff5";
    const client = await createClient(
        firmId,
        "Acme Corporation",
        "contact@acme.com",
        "555-123-4567",
    );
    console.log("client created")   
    console.log(client);
    const clients = await getClientsByFirm(firmId);
    console.log("clients for firm:");
    console.log(clients);

    process.exit(0);
}


main();
