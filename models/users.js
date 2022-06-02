let authorizedUsers = [];

function getAll() {
  return authorizedUsers;
}

function addUser(user) {
  authorizedUsers.push(user);
  return authorizedUsers;
}

function updateAllUsers(updateAllUsers) {
  authorizedUsers = updateAllUsers;
  return authorizedUsers;
}

module.exports = { getAll, addUser, updateAllUsers };
