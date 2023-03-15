const usersArray = [];

const joinUser = (id, username, room) => {
  const userObject = {
    id: id,
    username: username,
    room: room,
  };

  // this will not add more than 2 new users to usersArray
  console.log("UserArray lenght: ", usersArray.length)
  if(usersArray.length <= 1){
    usersArray.push(userObject);
  }
  else{
    
    usersArray == []
  }
  //
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
  console.log('users in room: ', room, usersArray )
  return usersArray.filter((user) => user.room === room);
};

module.exports = {
  joinUser,
  getCurrentUser,
  leaveUser,
  getUsersInRoom,
};
