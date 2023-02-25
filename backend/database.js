const mongoose = require("mongoose");
const leaderboards = require("./leaderboard");
mongoose.set('strictQuery', true);

// Change connection later once Heroku is set up
mongoose.connect("mongodb://localhost/rankings"); 

async function insertIntoDatabase(playerName, playerScore) {
    try {
        const record = await leaderboards.create({
            name: playerName, 
            score: playerScore
        }); 
        console.log(record);
        console.log("The record has been added!");
    } catch (e) {
        console.log(e.message);
    }
    finally {
        mongoose.disconnect(() => {
            console.log("The database has been successfully disconnected");
        });
    }
}

// CRUD operations for leaderboard rankings database
module.exports = db_interface = {
    insert: (playerName, playerScore) => {
        insertIntoDatabase(playerName, playerScore);
    }
}