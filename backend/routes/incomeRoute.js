const express = require("express");
const Income = require("../models/income.js");
const router = express.Router();
const protect = require("../middleware/authmiddleware.js");

// Create income
router.post("/", protect, async (req, res) => {
        try {
                const { title, amount, date } = req.body;

                if (!title && !amount) {
                        return res.status(400).json({ message: "Title and amount are required" });
                }

                const income = new Income({
                        title,
                        amount,
                        date,
                        user: req.user 
                });

                await income.save();
                res.status(201).json(income);
        } catch (error) { res.status(500).json({ error: error.message }) }
})

// Get user's incomes
router.get('/', protect, async (req, res) => {
    try {
        const items = await Income.find({ user: req.user }).sort({ date: -1 })
        res.json(items)
    } catch (err) { res.status(500).json({ error: err.message }) }
})

// Get income by id
router.get('/:id', protect, async (req, res) => {
    try {
        const item = await Income.findOne({ _id: req.params.id, user: req.user })
        if (!item) return res.status(404).json({ message: 'Not found' })
        res.json(item)
    } catch (err) { res.status(500).json({ error: err.message }) }
})

// Update income
router.put('/:id', protect, async (req, res) => {
    try {
        const i = await Income.findOneAndUpdate({ _id: req.params.id, user: req.user }, req.body, { new: true })
        if (!i) return res.status(404).json({ message: 'Not found' })
        res.json(i)
    } catch (err) { res.status(500).json({ error: err.message }) }
})

// Delete income
router.delete('/:id', protect, async (req, res) => {
    try {
        const i = await Income.findOneAndDelete({ _id: req.params.id, user: req.user })
        if (!i) return res.status(404).json({ message: 'Not found' })
        res.json({ message: 'Deleted' })
    } catch (err) { res.status(500).json({ error: err.message }) }
})

module.exports = router;