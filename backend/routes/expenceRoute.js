const express = require("express");
const Expense = require("../models/Expense.js");
const router = express.Router();
const protect = require("../middleware/authmiddleware.js");

// Create expense
router.post("/", protect, async (req, res) => {
        console.log(req.body)
        const { title, amount, category, date } = req.body;

        if (!title && !amount && !category) {
            return res.status(400).json({ message: "Title,category and amount are required" });
        }
        const expense = new Expense({
            title,
            amount,
            category,
            date,
            user: req.user 
        });

        await expense.save();

        res.status(201).json(expense);
        })

// Get user's expenses
router.get('/', protect, async (req, res) => {
    try {
        const items = await Expense.find({ user: req.user }).sort({ date: -1 })
        res.json(items)
    } catch (err) { res.status(500).json({ error: err.message }) }
})

// Get expense by id
router.get('/:id', protect, async (req, res) => {
    try {
        const item = await Expense.findOne({ _id: req.params.id, user: req.user })
        if (!item) return res.status(404).json({ message: 'Not found' })
        res.json(item)
    } catch (err) { res.status(500).json({ error: err.message }) }
})

// Update expense
router.put('/:id', protect, async (req, res) => {
    try {
        const e = await Expense.findOneAndUpdate({ _id: req.params.id, user: req.user }, req.body, { new: true })
        if (!e) return res.status(404).json({ message: 'Not found' })
        res.json(e)
    } catch (err) { res.status(500).json({ error: err.message }) }
})

// Delete expense
router.delete('/:id', protect, async (req, res) => {
    try {
        const e = await Expense.findOneAndDelete({ _id: req.params.id, user: req.user })
        if (!e) return res.status(404).json({ message: 'Not found' })
        res.json({ message: 'Deleted' })
    } catch (err) { res.status(500).json({ error: err.message }) }
})

module.exports = router;