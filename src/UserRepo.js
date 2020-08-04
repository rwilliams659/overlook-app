import User from './User'

class UserRepo {
  constructor(users) {
    this.users = users.map(user => new User(user)); 
  }

  findUser(searchTerm) {
    if (typeof searchTerm !== 'string') {
      searchTerm = searchTerm.toString(); 
    }
    searchTerm = searchTerm.toLowerCase(); 
    return this.users.find(user => user.name.toLowerCase().includes(searchTerm));
  }

  getUserFromId(id) {
    if (typeof id === 'string') {
      id = parseInt(id);
    }
    return this.users.find(user => user.id === id)
  }
}

export default UserRepo; 