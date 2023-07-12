import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import FolderIcon from '@material-ui/icons/Folder';
import FileList from './file-list';
import Button from '@mui/material/Button';

const DocumentFolders = ({ documents, folders }) => {      
    const [selectedFolder, setSelectedFolder] = useState(null);
    const handleFolderClick = (folderName) => {
        if (selectedFolder === folderName) {
            setSelectedFolder(null);
            return;
        }
        setSelectedFolder(folderName);
    };

    return (
        <div style={{ display: 'flex' }}>
            <div style={{ width: '20%' }}>
                {folders.map((folderName) => (
                    // TODO : change button size to be equal for each folder
                    <Button style={{ }} onClick={() => handleFolderClick(folderName)}>
                    <Card key={folderName}>
                    <CardContent>
                        <FolderIcon />
                        <Typography variant="h6">{folderName}</Typography>
                    </CardContent>
                    </Card>
                    </Button>
                ))}
            </div>
            <div style={{ width: '100%' }}>
            {selectedFolder != null && (
                <FileList documents = {documents} folderName={selectedFolder} folders={folders}/>
                )}
            </div>
        </div>
  );
};

export default DocumentFolders;
