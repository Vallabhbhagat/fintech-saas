const express = require("express");
const Income = require("../models/income.js");
const router = express.Router();
const protect = require("../middleware/authmiddleware.js");

try {
    router.post("/", protect, async (req, res) => {

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
    })
} catch (error) {

    res.status(500).json({ error: error.message });
}

module.exports = router;