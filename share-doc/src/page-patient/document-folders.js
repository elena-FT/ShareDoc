import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import FolderIcon from '@material-ui/icons/Folder';
import FileList from './file-list';
import { makeStyles } from '@material-ui/core/styles';

const DocumentFolders = ({ documents, folders }) => {      
    const [selectedFolder, setSelectedFolder] = useState(null);
    const handleFolderClick = (folderName) => {
        if (selectedFolder === folderName) {
            setSelectedFolder(null);
            return;
        }
        setSelectedFolder(folderName);
    };

    // const handleFolderClicke= (folderName) => {
    //     const folderDocuments = documents.filter((document) => document.folderName === folderName);
    //     console.log('Documents du dossier', folderName);
    //     folderDocuments.forEach((document) => {
    //       console.log(document.name);
    //     });
    //   };

    return (
        <div style={{ display: 'flex' }}>
            <div style={{ width: '50%' }}>
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
        <div style={{ width: '50%' }}>
        {selectedFolder != null && (
              <FileList documents = {documents} folderName={selectedFolder} />
            )}
        </div>
        </div>
  );
};

export default DocumentFolders;