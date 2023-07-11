export class Doctor {
  static lastId = 0;

  constructor(name) {
    this.id = ++Doctor.lastId;
    this.name = name;
    this.read = [];
    this.edit = [];
  }
}
