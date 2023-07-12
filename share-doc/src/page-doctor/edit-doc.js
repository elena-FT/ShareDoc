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

const EditDoc = ({file, folders}) => {
  const [value, setValue] = React.useState(0);
  const [openEdit, setOpenEdit] = React.useState(true);
  const [move, setMove] = React.useState('');
  const [newName, setNewName] = React.useState('');
  const [newType, setNewType] = React.useState('');
  const [validateDelete, setValidateDelete] = React.useState(false);

  console.log('file :' + file)
  console.log('folder :' + folders)

  // tmp, can't retrieve folders
  const foldersTmp = ['IRM', 'Radio'];

  const handleEditSaveInfo = () => {
    console.log('new anme :' + newName)
    console.log('new type :' + newType)
    if (newName || newType) {
      const patientData = localStorage.getItem('patient');

      if (!patientData) {
        console.log('Aucun patient trouvé');
        
      } else {
        const patient = JSON.parse(patientData);
        const index = patient.documents.findIndex(obj => obj.path === file.path);
    
        if (index !== -1) {
          console.log(patient.documents[index]);

          if (newName)
            patient.documents[index].name = newName;

          if (newType)
            patient.documents[index].type = newType;

          const updatedPatientData  = JSON.stringify(patient);
          localStorage.setItem('patient', updatedPatientData );

          console.log('Objet modifié');
        } else {
          console.log('Aucun objet trouvé avec le chemin ', file.path);
        }
      }
      setNewName('');
      setNewType('');
      setOpenEdit(false);
    }
  };

  // TODO
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
    console.log('delete file : ' + file.name)

    const patientData = localStorage.getItem('patient');

    if (!patientData) {
      console.log('Aucun patient trouvé');
    } else {
      const patient = JSON.parse(patientData);
      const index = patient.documents.findIndex(obj => obj.path === file.path);
  
      if (index !== -1) {
        console.log(patient.documents[index])
        patient.documents.splice(index, 1);

        const updatedPatientData  = JSON.stringify(patient);
        localStorage.setItem('patient', updatedPatientData );

        console.log('Objet supprimé');
      } else {
        console.log('Aucun objet trouvé avec le chemin', file.path);
      }
    }
    setValidateDelete(false)
    setOpenEdit(false)
  }

  const handleMoveFile = () => {
    if (move) {

      console.log('move file to folder ' + move)

      const patientData = localStorage.getItem('patient');

      if (!patientData) {
        console.log('Aucun patient trouvé');
      } else {
        const patient = JSON.parse(patientData);
        const index = patient.documents.findIndex(obj => obj.path === file.path);
    
        if (index !== -1) {
          console.log(patient.documents[index])
          const oldPath = patient.documents[index].path;
          patient.documents[index].path = move + '/' + oldPath.split('/').pop();
          console.log(move)
          console.log(patient.documents[index].path)

          const updatedPatientData  = JSON.stringify(patient);
          localStorage.setItem('patient', updatedPatientData );

          console.log('Objet déplacé');
        } else {
          console.log('Aucun objet trouvé avec le chemin', file.path);
        }
      }
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
                    <br />
                    { /* TODO : faire un select */ }
                    <strong>Modifier le type du document (ex: IRM,PDF)</strong> 
                    <TextField
                        autoFocus
                        margin="dense"
                        id="type"
                        label="Nouveau Type (change to select)"
                        type="type"
                        fullWidth
                        variant="standard"
                        value={newType}
                        onChange={(e) => setNewType(e.target.value)}
                    />
                    <br />
                    <Button onClick={handleEditSaveInfo}>Sauvegarder les changements</Button>
                </TabPanel>
                <TabPanel value={value} index={1} style={{ display: 'flex', flexDirection: 'column' }}>
                    Modifier les accès aux documents
                    <br />
                    <Button onClick={handleEditSaveAccess}>Sauvegarder les changements</Button>
                </TabPanel>
                <TabPanel value={value} index={2} style={{ display: 'flex', flexDirection: 'column' }}>
                    Déplacer le document (pas fonctionnel ??)

                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                        <Select
                            value={move}
                            onChange={(e) => setMove(e.target.value)}
                            displayEmpty
                            inputProps={{ 'aria-label': 'Without label' }}
                        >

                          <MenuItem value="">
                              <em>None</em>
                          </MenuItem>
                          {console.log(folders)}
                          {foldersTmp.map((item, index) => (
                              <MenuItem key={index} value={item}>{item}</MenuItem>
                          ))};
                        </Select>
                    </FormControl>

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