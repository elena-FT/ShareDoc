import User from './user';

export default class Patient extends User {
    constructor(firstName, lastName, callNumber, mail, password, dateOfBirth, socialSecurityNumber) {
      super(firstName, lastName, callNumber, mail, password);
      this.documents = [];
      this.dateOfBirth = dateOfBirth;
      this.socialSecurityNumber = socialSecurityNumber;
      this.doctors = [];
      this.read = [];
      this.write = [];
    }
  }