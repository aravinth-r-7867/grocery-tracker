import express from 'express';
import { getDB } from '../config/database.js';

const router = express.Router();

// GET all groceries
router.get('/', async (req, res) => {
    try {
        const db = getDB();
        const groceries = await db.collection('groceries').find({}).toArray();
        res.status(200).json(groceries);
    } catch (error) {
        console.error("Error fetching groceries:", error);
        res.status(500).json({ error: "Failed to fetch groceries" });
    }
});

// POST new grocery
router.post('/', async (req, res) => {
    try {
        const { name, quantity, unit } = req.body;
        
        if (!name || !quantity) {
            return res.status(400).json({ error: "Name and quantity are required" });
        }

        const newGrocery = {
            name,
            quantity: Number(quantity),
            unit: unit || 'pcs',
            createdAt: new Date()
        };

        const db = getDB();
        const result = await db.collection('groceries').insertOne(newGrocery);
        
        res.status(201).json({ ...newGrocery, _id: result.insertedId });
    } catch (error) {
        console.error("Error adding grocery:", error);
        res.status(500).json({ error: "Failed to add grocery" });
    }
});

export default router;
