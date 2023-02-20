const mongoose = require("mongoose");
const {Schema, model } = mongoose;

const leaderboardSchema = new Schema({
    name: {
        type: String,
        lowercase: true,
        required: true
    },
    score: {
        type: Number,
        required: true,
        min: 0
    }
})

module.exports = model("Leaderboard", leaderboardSchema);
