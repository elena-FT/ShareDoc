import User from './user';

export class Doctor extends User{

  static lastId = 0;

  constructor(firstname, lastname) {
    this.id = ++Doctor.lastId;
    this.firstname = firstname;
    this.lastname = lastname;
    this.read = [];
    this.edit = [];
    this.patient = [];
  }
}