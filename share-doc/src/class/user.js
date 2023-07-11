export default class User {
  id;
  firstName;
  lastName;
  callNumber;
  mail;
  password;
  documents = [];

  constructor() {
    if (this.constructor === User) {
      throw new TypeError('Abstract class "User" cannot be instantiated directly');
    }
  }
    setDocument(document) {
      this.documents.push(document);
    }
}