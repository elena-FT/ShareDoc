import React from 'react';
import DocumentFolders from './document-folders';

const DocumentsPage = ( { emailPatient} ) => {

  const storedPatients = localStorage.getItem('patient');

  if (!storedPatients) {
    console.log('Db patient not found');
    return;
  }

  const patients = JSON.parse(storedPatients);
  const patient = Object.values(patients).find(patient=> patient.mail === emailPatient);

  if (!patient) {
    console.log('Patient not found');
    return;
  }

  const documents = patient.document;
  if (!documents) {
    return <div></div>;
  }
  const folders = Array.from(new Set(documents.map((document) => document.type)));

  return (
    <div style={styles}>
      <h1>Documents de santé</h1>
      <p>
        Retrouvez ici vos documents partagés.
      </p>
       <DocumentFolders documents = { documents } folders={ folders }/>
    </div>
  );
};

const styles = {
  fontFamily: "Open Sans, sans-serif",
  fontSize: "1rem",
  p: {
    color: "gray",
    fontSize: "1rem",
    fontWeight: "smaller"
  },
  width: '100%'
};

export default DocumentsPage;
