import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { BLUE_COLOR } from '../ressources/constants.js'
import DialogActions from '@mui/material/DialogActions';
import DocumentTypes from '../ressources/documentTypes.js';
import InputLabel from '@mui/material/InputLabel';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const EditDoc = ({ emailPatient, file, folders }) => {
  const [value, setValue] = React.useState(0);
  const [openEdit, setOpenEdit] = React.useState(true);
  const [move, setMove] = React.useState('');
  const [newName, setNewName] = React.useState('');
  const [validateDelete, setValidateDelete] = React.useState(false);

  console.log('file :' + file)

  const handleEditNameFile = () => {
    if (newName) {
      const storedPatients = localStorage.getItem('patient');

      if (!storedPatients) {
        return;
      }

      const patients = JSON.parse(storedPatients);
      const indexPatient = patients.findIndex((patient) => patient.mail === emailPatient);

      if (indexPatient === -1) {
        console.log('Patient not found');
        return;
      }

      const indexDoc = patients[indexPatient].documents.findIndex(obj => obj.path === file.path);
      if (indexDoc === -1) {
        console.log('Document doesn\'t exists in the LocalStorage')
        return;
      }

      patients[indexPatient].documents[indexDoc].name = newName;

      const updatedPatientDB = JSON.stringify(patients);
      localStorage.setItem('patient', updatedPatientDB);
      
      setNewName('');
      setOpenEdit(false);
    }
  };

  // TODO : modified access
  const handleEditSaveAccess = () => {
    setOpenEdit(false);
  };

  const handleEditClose = () => {
    setOpenEdit(false);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleValidateDelete = () => {
    setValidateDelete(true);
  };

  const handleNoDeleteFile = () => {
    setValidateDelete(false);
  };

  const handleDeleteFile = () => {
    const storedPatients = localStorage.getItem('patient');

    if (!storedPatients) {
      return;
    }

    const patients = JSON.parse(storedPatients);
    const indexPatient = patients.findIndex((patient) => patient.mail === emailPatient);

    if (indexPatient === -1) {
      console.log('Patient not found');
      return;
    }

    const indexDoc = patients[indexPatient].documents.findIndex(obj => obj.path === file.path);
    if (indexDoc === -1) {
      console.log('Document doesn\'t exists in the LocalStorage')
      return;
    }

    patients[indexPatient].documents.splice(indexDoc, 1);

    const updatedPatientDB = JSON.stringify(patients);
    localStorage.setItem('patient', updatedPatientDB);
    
    setValidateDelete(false)
    setOpenEdit(false)
  }

  const handleMoveFile = () => {
    if (move) {

      console.log('move file to folder ' + move)

      const storedPatients = localStorage.getItem('patient');

      if (!storedPatients) {
        return;
      }

      const patients = JSON.parse(storedPatients);
      const indexPatient = patients.findIndex((patient) => patient.mail === emailPatient);

      if (indexPatient === -1) {
        console.log('Patient not found');
        return;
      }

      const indexDoc = patients[indexPatient].documents.findIndex(obj => obj.path === file.path);
      if (indexDoc === -1) {
        console.log('Document doesn\'t exists in the LocalStorage')
        return;
      }

      const oldPath = patients[indexPatient].documents[indexDoc].path;
      patients[indexPatient].documents[indexDoc].path = move + '/' + oldPath.split('/').pop();

      patients[indexPatient].documents[indexDoc].type = move;

      const updatedPatientDB = JSON.stringify(patients);
      localStorage.setItem('patient', updatedPatientDB);

      setMove('');
      setOpenEdit(false)
    }
  }

  return (
    <div>
        {validateDelete && 
           <Dialog
           open={validateDelete}
           aria-labelledby="alert-dialog-title"
           aria-describedby="alert-dialog-description"
         >
           <DialogTitle id="alert-dialog-title">
             {"Etes-vous sur de vouloir supprimé ce fichier de votre espace partagé ?"}
           </DialogTitle>
           <DialogActions>
             <Button onClick={handleNoDeleteFile}>Annuler</Button>
             <Button onClick={handleDeleteFile} autoFocus>
               Supprimer
             </Button>
           </DialogActions>
         </Dialog>
        }
        <Dialog open={openEdit}>
            <DialogTitle style={{ backgroundColor: '#74bbfb', justifyContent: 'center' }}>
                Modifier le document <em>{file.name}</em>
            </DialogTitle>
            <Box sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 250 }}>
                <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    value={value}
                    onChange={handleChange}
                    aria-label="Vertical tabs example"
                    sx={{ borderRight: 1, borderColor: 'divider', width: '40%' }}
                >
                    <Tab label="Informations" {...a11yProps(0)} />
                    <Tab label="Les droits" {...a11yProps(1)} />
                    <Tab label="Déplacer" {...a11yProps(2)} />
                    <Tab label="Supprimer" {...a11yProps(3)} />
                </Tabs>
                <TabPanel value={value} index={0} sx={{ display: 'flex', flexDirection: 'column' }}>
                    <strong>Modifier le nom du document </strong>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Nouveau Nom"
                        type="name"
                        fullWidth
                        variant="standard"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                    />
                    <Button onClick={handleEditNameFile}>Sauvegarder les changements</Button>
                </TabPanel>
                <TabPanel value={value} index={1} style={{ display: 'flex', flexDirection: 'column' }}>
                    Modifier les accès aux documents
                    <br />
                    <Button onClick={handleEditSaveAccess}>Sauvegarder les changements</Button>
                </TabPanel>
                <TabPanel value={value} index={2} style={{ display: 'flex', flexDirection: 'column' }}>
                    Changer le type du document
                    <Box sx={{ minWidth: 120 }}>
                      <FormControl fullWidth>
                        <InputLabel>Type</InputLabel>
                        <Select
                          value={move}
                          label="Type"
                          onChange={(e) => setMove(e.target.value)}
                        >
                          <MenuItem value="">None</MenuItem>
                          {Object.values(DocumentTypes).map((type) => (
                            <MenuItem key={type} value={type}>{type}</MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Box>

                    <Button
                        style={{
                            backgroundColor: BLUE_COLOR,
                            color: 'white',
                            padding: '10px 20px',
                            fontSize: '16px',
                            fontWeight: 'bold',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                        }}
                        onClick={handleMoveFile}
                        >
                        Déplacer
                    </Button>
                </TabPanel>
                <TabPanel value={value} index={3} sx={{ display: 'flex', flexDirection: 'column' }}>
                    Supprimer le document
                    <Button
                        style={{
                            backgroundColor: 'red',
                            color: 'white',
                            padding: '10px 20px',
                            fontSize: '16px',
                            fontWeight: 'bold',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                        }}
                        onClick={handleValidateDelete}>
                        Supprimer
                    </Button>
                </TabPanel>
            </Box>
            <Button onClick={handleEditClose}>Cancel</Button>
        </Dialog>
    </div>
  );
}


export default EditDoc;