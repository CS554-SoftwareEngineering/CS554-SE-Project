const {
    joinUser,
} = require('../backend/users');

test("User object with correct values", () => {
    const userTest = {
        id: 5,
        username: "Hali",
        room: "Room 1"
    }
    expect(joinUser(5, "Hali", "Room 1")).toEqual(userTest)
    expect(joinUser(5, "Joshua", "Room 1")).not.toEqual(userTest)
})
