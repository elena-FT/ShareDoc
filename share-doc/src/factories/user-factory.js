import { PatientBuilder } from './patient-builder.js';
import DocumentTypes from '../ressources/documentTypes';
import { Document } from '../class/document';
import FormatDocument from '../ressources/formatDocument.js';
import Doctor from '../class/doctor.js'
import {DoctorBuilder} from './doctor-builder.js'

export class UserFactory {
    static createBasicPatient() {
        const patient = PatientBuilder.buildPatient('Simon', 'Bouvier', '07 05 89 65 14', 'simon.bouvier@gmail.com', '1234', '1990-01-01', '1 90 01 01 123 456');
        patient.doctors = [
          new Doctor('Michel', 'Bouvier', '06 85 98 47 78', 'michel.bouvier@gmail.com', '123'),
        ];
        patient.documents = [
          new Document('Document1', 'IRM/Document1', new Date(), DocumentTypes.IRM, FormatDocument.PDF, 'test'),
          new Document('Document2', 'IRM/Document2', new Date(), DocumentTypes.IRM, FormatDocument.PNG, 'test'),
          new Document('Document3', 'Radio/Document3', new Date(), DocumentTypes.Radio, FormatDocument.PDF, 'test'),
          new Document('Document4', 'Document4', new Date(), DocumentTypes.Radio, FormatDocument.PDF, 'test')];
        return patient;
      }

      static createBasicDoctor() {
        const doctor = DoctorBuilder.buildDoctor('leo','mendoza','01','leo.mendoza@epita.fr','1')
        doctor.patients = ['michel.bouvier@gmail.com']
        return doctor
      }
}