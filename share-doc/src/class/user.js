export default class User {

  static lastId = 0;

  constructor(firstName, lastName, callNumber, mail, password) {
    this.id = ++User.lastId;
    this.firstName = firstName;
    this.lastName = lastName;
    this.callNumber = callNumber;
    this.mail = mail;
    this.password = password;
    this.documents = [];
  }
}