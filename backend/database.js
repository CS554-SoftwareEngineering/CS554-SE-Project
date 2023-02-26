const mongoose = require("mongoose");
const leaderboards = require("./leaderboard");
mongoose.set('strictQuery', true);

// Change connection later once Heroku is set up
mongoose.connect("mongodb://localhost/rankings"); 


async function insertIntoLeaderboards(playerName, playerScore) {
    try {
        const record = await leaderboards.create({
            name: playerName, 
            score: playerScore
        }); 
        console.log(record);
        console.log("Record added");
    } catch (error) {
        console.error(error.message);
    }
    finally {
        mongoose.disconnect(() => {
            console.log("Database disconnected");
        });
    }
}

// Need to change function to display to UI using React
async function displayLeaderboards(numToDisplay) {
    try {
        const display = await leaderboards.find().sort({score: -1}).limit(numToDisplay);
        console.log(display);
    } catch(error) {
        console.error(error.message);
    }
    finally {
        mongoose.disconnect(() => {
            console.log("Database disconnected");
        });
    }
}

// CRUD operations for leaderboard rankings database
module.exports = db_interface = {
    insert: (playerName, playerScore) => {
        insertIntoDatabase(playerName, playerScore);
    },
    display: (numToDisplay) => { 
        displayLeaderboards(numToDisplay);
    }
}
