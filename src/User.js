class User {
  constructor(user) {
    if (user) {
      this.id = user.id;
      this.name = user.name;
    }
  }
}

export default User; 