const usersArray = [];

const joinUser = (id, username, room) => {
  const userObject = {
    id: id,
    username: username,
    room: room,
  };
  usersArray.push(userObject);
  return userObject;
};

const getCurrentUser = (id) => {
  const currentUser = usersArray.find((user) => user.id === id);
  return currentUser;
};

const leaveUser = (id) => {
  const index = usersArray.findIndex((user) => user.id === id);

  if (index !== -1) {
    return usersArray.splice(index, 1)[0];
  }
};

const getUsersInRoom = (room) => {
  return usersArray.filter((user) => user.room === room);
};

module.exports = {
  joinUser,
  getCurrentUser,
  leaveUser,
  getUsersInRoom,
};
