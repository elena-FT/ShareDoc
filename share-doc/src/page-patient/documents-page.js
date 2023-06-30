import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import FolderIcon from '@material-ui/icons/Folder';
import { Document } from '../class/document';

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

  const folders = Array.from(new Set(documents.map((document) => document.folderName)));

  const handleFolderClick = (folderName) => {
    const folderDocuments = documents.filter((document) => document.folderName === folderName);
    console.log('Documents du dossier', folderName);
    folderDocuments.forEach((document) => {
      console.log(document.name);
    });
  };

  return (
    <div style={styles}>
      <h1>Documents de santé</h1>
      <p>
        Retrouvez ici vos documents partagés.
      </p>
      <div>
        {folders.map((folderName) => (
          <Card key={folderName}>
            <CardContent>
              <IconButton onClick={() => handleFolderClick(folderName)}>
                <FolderIcon />
              </IconButton>
              <Typography variant="h6">{folderName}</Typography>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DocumentsPage;
