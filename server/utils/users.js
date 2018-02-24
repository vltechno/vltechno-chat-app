class Users {
  constructor() {
    this.users = [];
  }
  addUser (id, name, room) {
    var user = {id, name, room};
    this.users.push(user);
    return user;
  }// end addUser
  rmUser (id) {
    var user = this.getUser(id);
    if(user) {
      this.users = this.users.filter((user) => user.id !== id); // i see
      // [] = filter([1,2,3,4]) and exclude 4 for example
    }
    return user;
  }// end rmUser
  getUser (id) {
    return this.users.filter((user) => user.id === id)[0];
  }// end getUser
  getUserList (room) {
      var users = this.users.filter((user) => {
          return user.room === room;
      });
      var nameArray = users.map((user) => {
        return user.name;
      });
      return nameArray;
  } // end getUserList
} // end class Users

module.exports = {Users};
