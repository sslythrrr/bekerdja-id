import express from "express";
import Candidate from "../models/Candidate.js";

const router = express.Router();

// 1. GET ALL
router.get("/", async (req, res) => {
    try {
        const candidates = await Candidate.find();
        res.json(candidates);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 2. CREATE (Add)
router.post("/", async (req, res) => {
    try {
        const newCandidate = new Candidate(req.body);
        const savedCandidate = await newCandidate.save();
        res.status(201).json(savedCandidate);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// 3. UPDATE (Edit Full Data)
router.put("/:id", async (req, res) => {
    try {
        // Kita cari berdasarkan custom 'id' (bukan _id mongo) sesuai skema lu
        const updatedCandidate = await Candidate.findOneAndUpdate(
            { id: req.params.id },
            req.body,
            { new: true }
        );
        res.json(updatedCandidate);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// 4. PATCH (Update Status doang)
router.patch("/:id/status", async (req, res) => {
    try {
        const updatedCandidate = await Candidate.findOneAndUpdate(
            { id: req.params.id },
            { status: req.body.status },
            { new: true }
        );
        res.json(updatedCandidate);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// 5. DELETE
router.delete("/:id", async (req, res) => {
    try {
        await Candidate.findOneAndDelete({ id: req.params.id });
        res.json({ message: "Deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;