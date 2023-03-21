const {
  joinUser,
  getCurrentUser,
  leaveUser,
  getUsersInRoom,
} = require('../backend/users');

test('User object with correct values', () => {
  const userTest = {
    id: 5,
    username: 'Hali',
    room: 'Room 1',
  };
  expect(joinUser(5, 'Hali', 'Room 1')).toEqual(userTest);
  expect(joinUser(5, 'Joshua', 'Room 1')).not.toEqual(userTest);
  expect(joinUser('5', 'Hali', 'Room 1')).not.toEqual(userTest);
  expect(joinUser()).toBeUndefined();
});

// Test the getCurrentUser function
test('getCurrentUser should return the correct user object', () => {
  joinUser(1, 'Hali', 'Room A');
  joinUser(2, 'Joshua', 'Room A');
  joinUser(3, 'Nachi', 'Room B');

  const currentUser = getCurrentUser(2);
  expect(currentUser.username).toBe('Joshua');
  expect(currentUser.room).toBe('Room A');
});

// Test the leaveUser function
test('leaveUser removes user from array', () => {
  const user1 = {
    id: 5,
    username: 'Hali',
    room: 'Room 1',
  };
  const user2 = {
    id: 2,
    username: 'Joshua',
    room: 'Room 1',
  };
  expect(joinUser(5, 'Hali', 'Room 1')).toEqual(user1);
  expect(joinUser(2, 'Joshua', 'Room 1')).toEqual(user2);

  expect(leaveUser(5)).toEqual(user1); // user1 should be removed from array and returned
  const currentUser = getCurrentUser(2);
  expect(currentUser.username).toBe('Joshua'); // user2 should still be in array

  expect(leaveUser(4)).toBeUndefined(); // no user with id 3, should return undefined
});

// Test the getUsersInRoom function
test('getUsersInRoom should return all users in a room', () => {
  joinUser(1, 'Joshua', 'Room 1');
  joinUser(2, 'Nachi', 'Room 1');
  joinUser(3, 'Leo', 'Room 2');
  joinUser(4, 'Hali', 'Room 1');

  const usersInRoom = getUsersInRoom('Room 1');
  expect(usersInRoom).toContainEqual({
    id: 1,
    username: 'Joshua',
    room: 'Room 1',
  });
  expect(usersInRoom).toContainEqual({
    id: 2,
    username: 'Nachi',
    room: 'Room 1',
  });
  expect(usersInRoom).toContainEqual({
    id: 4,
    username: 'Hali',
    room: 'Room 1',
  });
  expect(usersInRoom).not.toContainEqual({
    id: 3,
    username: 'Leo',
    room: 'Room 2',
  });
});
