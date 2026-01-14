const express = require("express");
const Income = require("../models/income.js");
const Expense = require("../models/Expense");
const protect = require("../middleware/authmiddleware.js");

const router = express.Router();

/**
 * GET /api/dashboard/summary
 * Get dashboard summary: total income, total expense, and balance
 * Protected route - requires JWT authentication
 * 
 * Response:
 * {
 *   "totalIncome": number,
 *   "totalExpense": number,
 *   "balance": number
 * }
 */
router.get("/summary", protect, async (req, res) => {
    try {
        // Fetch total income for the authenticated user
        const totalIncomeResult = await Income.aggregate([
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

        // Fetch total expense for the authenticated user
        const totalExpenseResult = await Expense.aggregate([
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

        // Extract totals or default to 0 if no data exists
        const totalIncome = totalIncomeResult[0]?.total || 0;
        const totalExpense = totalExpenseResult[0]?.total || 0;
        
        // Calculate balance: Income - Expense
        const balance = totalIncome - totalExpense;

        // Return summary data
        res.json({
            totalIncome,
            totalExpense,
            balance
        });
    } catch (error) {
        console.error("Dashboard summary error:", error);
        res.status(500).json({ 
            error: error.message || "Failed to fetch dashboard summary" 
        });
    }
});

module.exports = router;
