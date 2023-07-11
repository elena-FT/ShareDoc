import Patient from '../class/patient.js';

export class PatientBuilder {
    static buildPatient(firstname, lastname, callNumber, mail, password, dateOfBirth, socialSecurityNumber) {
        const patient = new Patient(firstname, lastname, callNumber, mail, password, dateOfBirth, socialSecurityNumber)
        return patient;
    }
}
