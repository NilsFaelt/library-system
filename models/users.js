const authorizedUsers = [];

function getAll() {
  return authorizedUsers;
}

function addUser(user) {
  authorizedUsers.push(user);
  return authorizedUsers;
}

module.exports = { getAll, addUser };
