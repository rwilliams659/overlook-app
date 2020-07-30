import User from './User'

class UserRepo {
  constructor(users) {
    this.users = users.map(user => new User(user)); 
  }
}

export default UserRepo; 