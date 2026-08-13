import { requireUser } from "../middleware/auth";
import { Router } from "express";
import {getClientsForUser,createClientForUser,getClientForUser,updateClientForUser,deleteClientForUser} from "../../services/clientService";
import{createClientSchema, updateClientSchema} from "../../validation/clientSchemas"

const router = Router();

router.use(requireUser);


router.get("/", async (req, res) => {
  const clients = await getClientsForUser(req.user!.id);

  res.json(clients);
});

router.get("/:clientId", async (req, res) => {
  const { clientId } = req.params;

  const client = await getClientForUser(
    req.user!.id,
    clientId,
  );

  if (!client) {
    return res.status(404).json({
      error: "Client not found",
    });
  }

  res.json(client);
});


router.post("/", async (req, res) => {
    const result = createClientSchema.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json({
            error: "Invalid request",
            details: result.error.flatten(),
        });
    }

    const { name, email, phone } = result.data;

    const client = await createClientForUser(
        req.user!.id,
        name,
        email,
        phone,
    );

    res.status(201).json(client);
});

router.patch("/:clientId", async (req, res) => {
  const { clientId } = req.params;

  const result = updateClientSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      error: "Invalid request",
      details: result.error.flatten(),
    });
  }

  const client = await updateClientForUser(
    req.user!.id,
    clientId,
    result.data,
  );

  if (!client) {
    return res.status(404).json({
      error: "Client not found",
    });
  }

  res.json(client);
});

router.delete("/:clientId", async (req, res) => {
  const { clientId } = req.params;

  const client = await deleteClientForUser(
    req.user!.id,
    clientId,
  );

  if (!client) {
    return res.status(404).json({
      error: "Client not found",
    });
  }

  res.json({
    message: "Client deleted",
    client,
  });
});

export default router;

