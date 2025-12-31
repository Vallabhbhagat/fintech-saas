const mongoose = require("mongoose");

const incomeSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
        trim: true
    },
    amount: {
        type: Number,
        require: true,
        trim: true
    },
    date: { type: Date, default: Date.now },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
});

const Income = mongoose.model("Income", incomeSchema);
module.exports = Income;