import { UserBuilder } from './user-builder.js';
import DocumentTypes from '../ressources/documentTypes';
import { Document } from '../class/document';

export class UserFactory {
    static createBasicPatient() {
        const patient = UserBuilder.buildUser('Simon', 'Bouvier', '1990-01-01', 1, 'simon.bouvier@gmail.com', '07 05 89 65 14', '1234');
        patient.doctors = [
            { id: 1, name: 'Dr. John Doe' },
            { id: 2, name: 'Dr. Jane Smith' },
            { id: 3, name: 'Dr. David Johnson' },
          ];
          patient.documents = [
            new Document('Document1', 'IRM/Document1', new Date(), 300, DocumentTypes.IRM),
            new Document('Document2', 'IRM/Document2', new Date(), 301, DocumentTypes.IRM),
            new Document('Document3', 'Radio/Document3', new Date(), 302, DocumentTypes.Radio)];
          return patient;
      }
}