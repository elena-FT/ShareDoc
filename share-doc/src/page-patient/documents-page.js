import React from 'react';
import DocumentFolders from './document-folders';

const DocumentsPage = () => {

  const patientData = localStorage.getItem('patient');

  if (!patientData) {
    console.log('Aucun patient trouvé');
  }

  // TODO : gérer le cas ou le patient n'est pas trouvé
  const patient = JSON.parse(patientData);

  const documents = patient.documents;
    if (!documents){
      return <div></div>
    }

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

  const folders = Array.from(new Set(documents.map((document) => document.type)));

  return (
    <div style={styles}>
      <h1>Documents de santé</h1>
      <p>
        Retrouvez ici vos documents partagés.
      </p>
       <DocumentFolders documents = { documents } folders={folders}/>
    </div>
  );
};

export default DocumentsPage;
