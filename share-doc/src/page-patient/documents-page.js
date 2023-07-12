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

  const documents = patient.documents;
  if (!documents) {
    return (
      <div style={styles}>
        <h1>Documents de santé</h1>
        <p>
          Retrouvez ici vos documents partagés.
        </p>
        <div style={{ marginTop: '200px', textAlign: 'center' }}>
          <p style={{ color: 'gray' }}>
            <em>Vous n'avez actuellement aucun fichier dans votre espace.<br />
            Appuyez sur 'Nouveau' pour ajouter des fichiers.</em>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={styles}>
      <h1>Documents de santé</h1>
      <p>
        Retrouvez ici vos documents partagés.
      </p>
       <DocumentFolders emailPatient={emailPatient} documents={ documents }/>
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
  width: '100%',
  marginLeft: '50px',
  marginTop: '20px',
};

export default DocumentsPage;
