const mongoose = require("mongoose");
const leaderboards = require("./leaderboard");
mongoose.set('strictQuery', true);

//Change connection later once Heroku is set up
mongoose.connect("mongodb://localhost/rankings"); 

async function insertIntoDatabase() {
    try {
        const record = await leaderboards.create({
            name: "Raven", 
            score: 7
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

//add CRUD operations when leaderboard structure is defined
module.exports = db_interface = {
    insert: () => { //add arg later
        insertIntoDatabase();
    }
}