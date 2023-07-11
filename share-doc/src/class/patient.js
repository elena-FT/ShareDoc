import User from './user';

class Patient extends User {

    static lastId = 0;

    constructor(firstname, lastname, callNumber, mail, password, documents, dateOfBirth, socialSecurityNumber, doctors) { 
    this.id = ++Patient.lastId;
    this.firstname = firstname;
    this.lastname = lastname;
    this.callNumber = callNumber;
    this.mail = mail;
    this.password = password;
    this.documents = documents;
    this.dateOfBirth = dateOfBirth;
    this.socialSecurityNumber = socialSecurityNumber;
    this.doctors = doctors;
    }
}