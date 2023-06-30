import { UserBuilder } from './user-builder.js';

export class UserFactory {
    static createBasicPatient() {
        const patient = UserBuilder.buildUser('Simon', 'Bouvier', '1990-01-01', 1, 'simon.bouvier@gmail.com', '1234');
        patient.doctors = [
            { id: 1, name: 'Dr. John Doe' },
            { id: 2, name: 'Dr. Jane Smith' },
            { id: 3, name: 'Dr. David Johnson' },
          ];
          patient.documentsId = [300, 301];
          return patient;
      }
}