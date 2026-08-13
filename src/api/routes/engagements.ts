import { Router } from "express";

import { requireUser } from "../middleware/auth";

import {
    createEngagementForUser,
    getEngagementsForUser,
    updateEngagementForUser,
    deleteEngagementForUser,
} from "../../services/engagementService";

import{createEngagementSchema, updateEngagementSchema} from "../../validation/engagementSchemas"


const router = Router();

router.use(requireUser);

router.get("/:clientId/engagements", async (req, res) => {
    const { clientId } = req.params;

    const engagements = await getEngagementsForUser(
        req.user!.id,
        clientId,
    );
    
    if(!engagements){
        return res.status(404).json({
            error: "Client not found",
        });
    }

    res.json(engagements);
});

router.post("/:clientId/engagements", async (req, res) => {
    const { clientId } = req.params;

    // Keep your existing Zod validation here.

    const engagement = await createEngagementForUser(
        req.user!.id,
        clientId,
        // your existing validated fields...
    );

    if(!engagements){
        return res.status(404).json({
            error: "Client not found",
        });
    }

    res.status(201).json(engagement);
});

router.patch("/:clientId/engagements/:engagementId", async (req,res) => {
    const {clientId, engagementId} = req.params;
    const result = updateEngagementSchema.safeParse(req.body);

    if(!result.success){
        return res.status(400).json({
            error:"Invalid Request",
            details: result.error.flatten(),
        });
    }

    const engagement = await updateEngagementForUser(
        req.user!.id,
        clientId,
        engagementId,
        result.data,
    );
    
    if(!engagement){
        return res.status(404).json({
            error:"Engagement not found"
        });
    }
    res.json(engagement);
    },);

router.delete("/:clientId/engagements/:engagementId", async (req, res) => {
    const{clientId, engagementId} = req.params;
    const engagement = await deleteEngagementForUser(
        req.user!.id,
        clientId,
        engagementId,
    );
    
    if(!engagement){
        return res.status(404).json({
            error:"Engagement not found"
        });
    }
    res.json({
        message:"Engagement deleted",
        engagement,
    });
},);

export default router;
