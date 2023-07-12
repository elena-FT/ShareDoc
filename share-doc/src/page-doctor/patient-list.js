import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Doctor } from '../class/doctor.js'
import User from '../class/user.js';
import { useLocation } from 'react-router-dom';
import DocumentsPage from './documents-page.js';
import ButtonNew from '../components/button-new.js';
import { MyContext } from './page-doctor.js';
import { useContext } from 'react';

// TODO : gérer le cas de suppression d'un docteur (dans le même bouton que celui pour ajouter un docteur)

const useStyles = makeStyles((theme) =>({
  icon: {
    color: 'lightgrey',
  },
  card: {
    marginBottom: '1rem',
  },
  patientItem: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    marginBottom: '0.5rem',
  },
  icon: {
    marginRight: '0.5rem',
  },
  button: {
    width: '20', 
    height: '20',  

  },
}));

const PatientList = () => {
  const [open, setOpen] = React.useState(false);
  const [viewDocs, SetViewDocs] = React.useState(false);
  const [keyDocs, SetKeyDocs] = React.useState('')
  const [patientName, SetPatientName] = React.useState('');

  const {patientBouton, SetPatientBouton} =  useContext(MyContext);

  const email = useLocation().state.mail;

  const storedDoctors = localStorage.getItem('doctor');
  const doctors = JSON.parse(storedDoctors);

  const storedPatients = localStorage.getItem('patient')
  const patients = JSON.parse(storedPatients)


  //const doctor = Object.values(doctors).find(doctor=> doctor.mail === email)
  var indexDoctor = doctors.findIndex(function(obj) {
    return obj.mail === email;
  });
  const doctor = doctors[indexDoctor]

  // TODO : gérer le cas ou le patient n'est pas trouvé
  const doctorPatients = doctor.patients;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCreate = () => {
    if (patientName) {
      // faire la verification du patient
        const patient = Object.values(patients).find(patient=> patient.mail === patientName)
        console.log(patient)
        if (typeof patient !== 'undefined') 
        {
          doctor.patients.push(patientName);
          doctors.splice(indexDoctor, 1)
          doctors.push(doctor)
          const doctorsupdatedData = JSON.stringify(doctors);
          localStorage.setItem('doctor', doctorsupdatedData);
          SetPatientName('')
          setOpen(false)
        }
    }
  }

  const classes = useStyles();

  const handlePatientClick = (patientEmail) => {
    const patient = Object.values(patients).find(patient=> patient.mail === patientEmail)
    //console.log(patient)
    if(typeof patient != 'undefined') {
      SetKeyDocs(patient.mail)
      SetPatientBouton(patient.mail)
      //console.log(patientBouton)
      SetViewDocs(true)
    }
    else{
      SetViewDocs(false)
    }
  };

  const handleButtonClick = () => {
      SetViewDocs(true)
  }

  return (
    <div>
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Liste des patients
        </Typography>
        {doctorPatients.map((patientEmail) => (
        <div key={patientEmail.id} className={classes.patientItem} onClick={() => handlePatientClick(patientEmail)}>
          <Typography>
            <AccountCircleIcon className={classes.icon} />
            {patientEmail}
          </Typography>
        </div>
        ))}
      </CardContent>
    </Card>
    <Button variant="outlined" onClick={handleClickOpen}>
      Ajouter un nouveau patient
    </Button>
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Nouveau Patient</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <strong>Email du patient</strong>
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Email"
          type="name"
          fullWidth
          variant="standard"
          value={patientName}
          onChange={(e) => SetPatientName(e.target.value)}
        />
        <br />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Annuler</Button>
        <Button onClick={() => handleCreate(patientName)}>Créer</Button>
      </DialogActions>
    </Dialog>
    {viewDocs && <DocumentsPage emailPatient={keyDocs}>        
    </DocumentsPage>}
  </div>
  );
};

export default PatientList;
