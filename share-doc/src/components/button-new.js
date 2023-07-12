import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { BLUE_COLOR, BLUE_DARKEN_COLOR } from '../ressources/constants';
import { Document } from '../class/document';
import DocumentTypes from '../ressources/documentTypes.js';
import FormatDocument from '../ressources/formatDocument.js';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const ButtonNew = ({ emailPatient }) => {
  const classes = useStyles();
  const [selectedType, setSelectedType] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const uploadFileToDB = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setOpenDialog(true);
  };

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };
  
  
  const handleTypeSelection = () => {
    if (selectedType) {
      const storedPatients = localStorage.getItem('patient');

      if (!storedPatients) {
        return;
      }

      const patients = JSON.parse(storedPatients);
      const index = patients.findIndex((patient) => patient.mail === emailPatient);

      if (index === -1) {
        console.log('Patient not found');
        return;
      }

      const reader = new FileReader();
      reader.onload = function (event) {

        const fileContent = event.target.result;
  
        const parts = selectedFile.name.split('.');
        const ext = parts[parts.length - 1];
        let format = null;
  
        for (const key in FormatDocument) {
          if (FormatDocument[key] === ext) {
            format = key;
            break;
          }
        }
  
        const path = selectedType + '/' + selectedFile.name;
        const newDoc = new Document(selectedFile.name, path, new Date(), selectedType, format, fileContent);
        patients[index].documents.push(newDoc);
  
        const updatedPatientDB = JSON.stringify(patients);
        localStorage.setItem('patient', updatedPatientDB);
      };
  
      reader.readAsDataURL(selectedFile);
    }
  
    setSelectedFile(null);
    setSelectedType('');
    setOpenDialog(false);
  };
  

  const handleDialogClose = () => {
    setSelectedFile(null);
    setOpenDialog(false);
  };
  

  return (
    <div>
      <input type="file" id="fileInput" style={{ display: 'none' }} onChange={uploadFileToDB} />
      <Button variant="contained" color="primary" className={classes.roundedButton} onClick={() => document.getElementById('fileInput').click()}>
        + Ajouter un document
      </Button>
      {selectedFile && (
        <Dialog open={openDialog}>
          <DialogTitle>Sélectionner le type de document</DialogTitle>
          <DialogContent>
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel>Type</InputLabel>
                <Select
                  value={selectedType}
                  label="Type"
                  onChange={handleTypeChange}
                >
                  <MenuItem value="">Sélectionner le type</MenuItem>
                  {Object.values(DocumentTypes).map((type) => (
                    <MenuItem key={type} value={type}>{type}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose} color="primary">
              Annuler
            </Button>
            <Button onClick={handleTypeSelection} color="primary">
              Importer fichier
            </Button>
          </DialogActions>
        </Dialog>
)}

    </div>
  );
};

export default ButtonNew;

const useStyles = makeStyles({
  roundedButton: {
    borderRadius: '50px',
    textTransform: 'none',
    backgroundColor: BLUE_COLOR,
    margin: '1rem',
    '&:hover': {
      backgroundColor: BLUE_DARKEN_COLOR
    },
  },
  popup: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    padding: '1rem',
    backgroundColor: '#fff',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.3)',
    zIndex: 9999,
  },
});
