const db = require('./db')
const db_interface = require('../backend/database')
const { insert } = require('../backend/database')

beforeAll(async () => await db.dbConnect)
afterEach(async () => await db.clearDatabase)
afterAll(async () => await db.dbDisconnect)

test("Inserting into database", async () => {
    const insertValue = {
        name: "hali",
        score: 25
    }
    const {name, score} = await db_interface.insert('Hali', 25)
    expect(name).toEqual(insertValue.name)
    expect(score).toEqual(insertValue.score)
})

