const { TestWatcher } = require("jest-watcher");
const mongoose = require("mongoose");
const { resolve } = require("path");
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
        return record
    } catch (error) {
        throw err
    }
    finally {
        mongoose.connection.close()
    }
}

async function retrieveLeaderboardRecords(numRecordsToRetrieve) {
    try {
        const allRecords = await leaderboards.find().sort({score: -1}).limit(numRecordsToRetrieve);
        return allRecords;
    } catch (error) {
        throw error
    }
    finally{
        mongoose.connection.close()
    }
}

// CRUD operations for leaderboard rankings database
module.exports = db_interface = {
    insert: (playerName, playerScore) => {
        return insertIntoLeaderboards(playerName, playerScore)
    },
    retrieve: (numRecordsToRetrieve) => {
        return retrieveLeaderboardRecords(numRecordsToRetrieve);
    }
}
