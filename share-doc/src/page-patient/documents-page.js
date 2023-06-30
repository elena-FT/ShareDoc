import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import FolderIcon from '@material-ui/icons/Folder';
import DocumentFolders from './document-folders';

const DocumentsPage = ({ documents }) => {
  const styles = {
    fontFamily: "Open Sans, sans-serif",
    fontSize: "1rem",
    p: {
      color: "gray",
      fontSize: "1rem",
      fontWeight: "smaller"
    }
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
