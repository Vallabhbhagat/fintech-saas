const express = require("express");
const Income = require("../models/income.js");
const Expense = require("../models/Expense");
const protect = require("../middleware/authmiddleware.js");

const router = express.Router();

// GET summary: income, expense, balance (protected)
router.get("/summary", protect, async (req, res) => {
    try {
        const totalIncome = await Income.aggregate([
            {
                $match: { user: req.user }
            },
            {
                $group: {
                    _id: null,
                    total: { $sum: "$amount" }
                }
            }
        ]);

        const totalExpense = await Expense.aggregate([
            {
                $match: { user: req.user }
            },
            {
                $group: {
                    _id: null,
                    total: { $sum: "$amount" }
                }
            }
        ]);

        const income = totalIncome[0]?.total || 0;
        const expense = totalExpense[0]?.total || 0;

        res.json({
            totalIncome: income,
            totalExpense: expense,
            balance: income - expense
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.get("/transactions", protect, async (req, res) => {
    try {
        const incomes = await Income.find({ user: req.user }).lean();
        const expenses = await Expense.find({ user: req.user }).lean();

        const allTransactions = [
            ...incomes.map(i => ({ ...i, type: "income" })),
            ...expenses.map(e => ({ ...e, type: "expense" }))
        ].sort((a, b) => new Date(b.date) - new Date(a.date));

        res.json(allTransactions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
