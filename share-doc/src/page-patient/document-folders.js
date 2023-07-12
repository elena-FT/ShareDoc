import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import FolderIcon from '@material-ui/icons/Folder';
import FileList from './file-list';
import Button from '@mui/material/Button';
import {makeStyles} from "@material-ui/core/styles";
import {BLUE_COLOR} from "../ressources/constants";

const useStyles = makeStyles({
    folder: {
        borderRadius: '50px',
        backgroundColor: BLUE_COLOR

    }




});
const DocumentFolders = ({ emailPatient, documents }) => {      
    const [selectedFolder, setSelectedFolder] = useState(null);
    const folders = Array.from(new Set(documents.map((document) => document.type)));
    const classes = useStyles();

    const handleFolderClick = (folderName) => {
        if (selectedFolder === folderName) {
            setSelectedFolder(null);
            return;
        }
        setSelectedFolder(folderName);
    };

    return (
        <div style={{ display: 'flex' }}>
            <div style={{width:'20%'}}>
                {folders.map((folderName) => (
                    // TODO : change button size to be equal for each folder
                    <Button  onClick={() => handleFolderClick(folderName)}>
                    <Card style={ {borderRadius:'50px',
                        backgroundColor:BLUE_COLOR,width:'200px',height:'120px'} } key={folderName}>
                    <CardContent>
                        <FolderIcon style={{color: 'white'}} />
                        <Typography  style={{textTransform:'none', color:'white'}}  variant="h6">{folderName}</Typography>
                    </CardContent>
                    </Card>
                    </Button>
                ))}
            </div>
            <div style={{ width: '100%' }}>
            {selectedFolder != null && (
                <FileList emailPatient={emailPatient} documents={documents} folderName={selectedFolder} folders={folders}/>
                )}
            </div>
        </div>
  );
};

export default DocumentFolders;
