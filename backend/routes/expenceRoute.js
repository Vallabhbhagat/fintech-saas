const express = require("express");
const Expense = require("../models/Expense.js");
const router = express.Router();
const protect = require("../middleware/authmiddleware.js");

try {
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

} catch (error) {
    console.log(error)
}
module.exports = router;