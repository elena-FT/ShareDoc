export default class User {
  constructor(firstName, lastName, dateOfBirth, id, mail, password, isDoctor = false) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.dateOfBirth = dateOfBirth;
    this.socialSecurityNumber = null;
    this.documentsId = [];

    if (isDoctor) {
      this.patients = []; // Liste des patients associés au médecin
    } else {
      this.doctors = []; // Liste des médecins associés au patient
    }

    this.mail = mail;
    this.password = password;
  }

  setDocument(documentId) {
    this.documentsId.push(documentId);
  }

  setDoctor(doctor) {
    this.doctors.push(doctor);
  }
}
