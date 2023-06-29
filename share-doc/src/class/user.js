export class User {
    constructor(firstName, lastName, dateOfBirth, id, mail, password) {
      this.id = id;
      this.firstName = firstName;
      this.lastName = lastName;
      this.dateOfBirth = dateOfBirth;
      this.socialSecurityNumber = null;
      this.documentsId = [];
      this.mail = mail;
      this.password = password;
    }
  }