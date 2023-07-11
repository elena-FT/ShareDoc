import User from './user';

export default class Doctor extends User {
  constructor(firstName, lastName, callNumber, mail, password) {
    super(firstName, lastName, callNumber, mail, password);
    this.patients = [];
  }
}