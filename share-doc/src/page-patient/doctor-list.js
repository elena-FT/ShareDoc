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


// TODO : gérer le cas de suppression d'un docteur (dans le même bouton que celui pour ajouter un docteur)

const useStyles = makeStyles({
  icon: {
    color: 'lightgrey',
  },
  card: {
    marginBottom: '1rem',
  },
  doctorItem: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    marginBottom: '0.5rem',
  },
  icon: {
    marginRight: '0.5rem',
  },
});

const DoctorList = () => {
  const [open, setOpen] = React.useState(false);
  const [doctorName, setDoctorName] = React.useState('');

  const patientData = localStorage.getItem('patient');
  const classes = useStyles();

  if (!patientData) {
    console.log('Aucun patient trouvé');
  }

  // TODO : gérer le cas ou le patient n'est pas trouvé
  const patient = JSON.parse(patientData);
  const doctors = patient.doctors;
    if (!doctors){
      return <div></div>
    }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCreate = () => {
    if (doctorName) {
      patient.doctors.push(new Doctor(doctorName));
      const patientUpdatedData = JSON.stringify(patient);
      localStorage.setItem('patient', patientUpdatedData);
      setDoctorName('');
      setOpen(false);
    }
  }

  const handleDoctorClick = (doctorId) => {
    console.log('Clicked doctor:', doctorId);
  };

  return (
    <div>
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Liste des docteurs
        </Typography>
        { doctors.map((doctor) => (
          <Typography
            key={doctor.id}
            className={classes.doctorItem}
            onClick={() => handleDoctorClick(doctor.id)}>
            <ListItemIcon className={classes.icon}>
              <AccountCircleIcon />
            </ListItemIcon>
            {doctor.name}
          </Typography>
        ))}
      </CardContent>
    </Card>
    <Button variant="outlined" onClick={handleClickOpen}>
      Ajouter un nouveau Docteur
    </Button>
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Nouveau Docteur</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <strong>Nom du Docteur</strong>
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Prénom Nom"
          type="name"
          fullWidth
          variant="standard"
          value={doctorName}
          onChange={(e) => setDoctorName(e.target.value)}
        />
        <br />
        <strong>Hôpital/cabinet où il exerce</strong>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Hôpital / cabinet"
          type="name"
          fullWidth
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Annuler</Button>
        <Button onClick={() => handleCreate(doctorName)}>Créer</Button>
      </DialogActions>
    </Dialog>
  </div>
  );
};

export default DoctorList;
