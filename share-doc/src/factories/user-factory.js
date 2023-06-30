import { UserBuilder } from './user-builder.js';
import DocumentTypes from '../ressources/documentTypes';
import { Document } from '../class/document';
import FormatDocument from '../ressources/formatDocument.js';

export class UserFactory {
    static createBasicPatient() {
        const patient = UserBuilder.buildUser('Simon', 'Bouvier', '1990-01-01', 1, 'simon.bouvier@gmail.com', '07 05 89 65 14', '1234');
        patient.doctors = [
            { id: 1, name: 'Dr. John Doe' },
            { id: 2, name: 'Dr. Jane Smith' },
            { id: 3, name: 'Dr. David Johnson' },
          ];
          patient.socialSecurityNumber = '1 90 01 01 123 456';
          patient.documents = [
            new Document('Document1', 'IRM/Document1', new Date(), 300, DocumentTypes.IRM, FormatDocument.PDF),
            new Document('Document2', 'IRM/Document2', new Date(), 301, DocumentTypes.IRM, FormatDocument.PNG),
            new Document('Document3', 'Radio/Document3', new Date(), 302, DocumentTypes.Radio, FormatDocument.PDF),
            new Document('Document4', 'Document4', new Date(), 302, DocumentTypes.Radio, FormatDocument.PDF)];
          return patient;
      }
}