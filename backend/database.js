const mongoose = require("mongoose");
const leaderboards = require("./leaderboard");
mongoose.set('strictQuery', true);

// Connection to Heroku
// const uri = process.env.MONGODB_URI;
// mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('MongoDB connected'))
//   .catch(err => console.log(err));

// Connection to localhost for testing
mongoose.connect("mongodb://localhost/rankings")

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

// For dev purposes to view leaderboards, can be deleted later
async function displayLeaderboards(numRecordsToDisplay) {
    try {
        const display = await leaderboards.find().sort({score: -1}).limit(numRecordsToDisplay);
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

async function retrieveLeaderboardRecords(numRecordsToRetrieve) {
    try {
        const allRecords = await leaderboards.find().sort({score: -1}).limit(numRecordsToRetrieve); 
        return allRecords;
    } catch (error) {
        console.error(error.message);   
    }
    finally{
        mongoose.disconnect(() => {
            console.log("Database disconnected")
        })
    }
}

// CRUD operations for leaderboard rankings database
module.exports = db_interface = {
    insert: (playerName, playerScore) => {
        insertIntoLeaderboards(playerName, playerScore)
    },
    display: (numToDisplay) => {
        displayLeaderboards(numToDisplay);
    },
    retrieve: (numRecordsToRetrieve) => {
        return retrieveLeaderboardRecords(numRecordsToRetrieve);
    }
}


