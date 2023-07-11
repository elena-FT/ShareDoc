export default class User {
  static lastId = 0

  constructor(firstName, lastName, dateOfBirth, mail, callNumber, password, isDoctor = false) {
    this.id = ++User.lastId;
    this.firstName = firstName;
    this.lastName = lastName;
    this.dateOfBirth = dateOfBirth;
    this.socialSecurityNumber = null;
    this.documents = [];

    if (isDoctor) {
      this.patients = []; // Liste des patients associés au médecin
    } else {
      this.doctors = []; // Liste des médecins associés au patient
    }

    this.callNumber = callNumber;
    this.mail = mail;
    this.password = password;
  }

  setDocument(document) {
    this.documents.push(document);
  }

  setDoctor(doctor) {
    this.doctors.push(doctor);
  }
}
