const mongoose = require("mongoose");

const expenceSchema = new mongoose.Schema({
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
    category: String,
    date: { type: Date, default: Date.now },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
});

const Expence = mongoose.model("Expence", expenceSchema);
module.exports = Expence;