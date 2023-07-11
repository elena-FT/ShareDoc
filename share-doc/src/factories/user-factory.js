import { UserBuilder } from './user-builder.js';
import DocumentTypes from '../ressources/documentTypes';
import { Document } from '../class/document';
import FormatDocument from '../ressources/formatDocument.js';
import { Doctor } from '../class/doctor.js'
export class UserFactory {
    static createBasicPatient() {
        const patient = UserBuilder.buildUser('Simon', 'Bouvier', '1990-01-01', 1, 'simon.bouvier@gmail.com', '07 05 89 65 14', '1234');
        patient.doctors = [
          new Doctor('Dr. John Doe'),
          new Doctor('Dr. Jane Smith'),
          new Doctor('Dr. David Johnson')
        ];
        patient.socialSecurityNumber = '1 90 01 01 123 456';
        patient.documents = [
          new Document('Document1', 'IRM/Document1', new Date(), DocumentTypes.IRM, FormatDocument.PDF, 'test'),
          new Document('Document2', 'IRM/Document2', new Date(), DocumentTypes.IRM, FormatDocument.PNG, 'test'),
          new Document('Document3', 'Radio/Document3', new Date(), DocumentTypes.Radio, FormatDocument.PDF, 'test'),
          new Document('Document4', 'Document4', new Date(), DocumentTypes.Radio, FormatDocument.PDF, 'test')];
        return patient;
      }
}