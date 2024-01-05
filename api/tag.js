import express from "express";
let router = express.Router();

import { requireAuth } from "../services/passport-config.js";
import { tagQueries } from "../model/tag.js"

router.get("/tags", requireAuth, async (req, res) => {
    try {
        const tags = await tagQueries.getTags();
        res.send(tags);
    } catch (error) {
        res.status(500).send("Server error", error);
    }
});

router.post("/tag", requireAuth, async (req, res) => {
    try {
        const tags = await tagQueries.addTag(req.body);
        res.send(tags);
    } catch (error) {
        res.status(500).send("Server error", error);
    }
})

router.delete("/tag/:id", requireAuth, async (req, res) => {
    try {
        const id = req.params.id
        const tags = await tagQueries.removeTag(id);
        res.status(200).send("delete operation Success");
    } catch (error) {
        res.status(500).send("Server error", error);
    }
})

router.put("/tag/:id", requireAuth, async (req, res) => {
    try {
        const id = req.params.id
        const tagUpdate = await tagQueries.updateTag(id, req.body);
        res.status(200).send(tagUpdate);
    } catch (error) {
        res.status(500).send("Server error", error);
    }
})

export default router;