const mongoose = require("mongoose");
const leaderboards = require("./leaderboard");
mongoose.set('strictQuery', true);

//Change connection later once Heroku is set up
mongoose.connect("mongodb://localhost/rankings"); 

run()
async function run() {
    try {
        const record = await leaderboards.create({
            name: "Hali", 
            score: 5
        }); 
        console.log(record);
    } catch (e) {
        console.log(e.message);
    }
}