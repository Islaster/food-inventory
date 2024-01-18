class User {
  constructor(id, fullName, email, password, userName) {
    (this.id = id),
      (this.fullName = fullName),
      (this.email = email),
      (this.password = password),
      (this.userName = userName),
      (this.admin = "No");
  }
}

module.exports = User;
