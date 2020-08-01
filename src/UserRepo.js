import User from './User'

class UserRepo {
  constructor(users) {
    this.users = users.map(user => new User(user)); 
  }

  findUser(searchTerm) {
    return this.users.find(user => user.name.includes(searchTerm));
  }

  getUserFromId(id) {
    return this.users.find(user => user.id === id)
  }
}

export default UserRepo; 