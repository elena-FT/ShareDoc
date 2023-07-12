import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const DoctorList = ({ emailPatient }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [doctorName, setDoctorName] = React.useState('');

  const storedPatients = localStorage.getItem('patient');
  if (!storedPatients) {
    console.log('DB patient not found');
    return;
  }

  const patients = JSON.parse(storedPatients);
  const indexPatient = patients.findIndex((patient) => patient.mail === emailPatient);

  if (indexPatient === -1) {
    console.log('Patient not found');
    return;
  }

  const doctorsPatient = patients[indexPatient].doctors;
  if (!doctorsPatient){
    return <div></div>
  }
  
  const storedDoctors = localStorage.getItem('doctor');
  if (!storedDoctors) {
    console.log('DB doctors not found');
    return <div></div>;
  }

  const doctors = JSON.parse(storedDoctors);
  const doctotsNameList = doctors.map((objet) => `${objet.firstName} ${objet.lastName}`);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCreate = () => {
    if (doctorName) {
      const doctor = Object.values(doctors).find(patient=> patient.firstName === doctorName.split(" ")[0])
      if (!doctor) {
        console.log('no doctor found');
        return;
      }
      patients[indexPatient].doctors.push(doctor.mail);
      const patientUpdatedData = JSON.stringify(patients);
      localStorage.setItem('patient', patientUpdatedData);
      setDoctorName('');
      setOpen(false);
    }
  }

  // TODO : delete doctor with a popup that ask
  const handleDoctorClick = (doctorMail) => {
    console.log('Clicked doctor:', doctorMail);
  };

  return (
    <div>
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Liste des docteurs
        </Typography>
        {doctorsPatient.map((doctorMail) => {
          const doctor = Object.values(doctors).find(
            (doctor) => doctor.mail === doctorMail
          );

          return (
            <Typography
              key={doctorMail}
              className={classes.doctorItem}
              onClick={() => handleDoctorClick(doctorMail)}
            >
              <ListItemIcon className={classes.icon}>
                <AccountCircleIcon />
              </ListItemIcon>
              {doctor && `${doctor.firstName} ${doctor.lastName}`}
            </Typography>
          );
        })}
      </CardContent>
    </Card>
    <Button variant="outlined" onClick={handleClickOpen}>
      Ajouter un nouveau Docteur
    </Button>
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Nouveau Docteur</DialogTitle>
      <DialogContent>
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <Select
              value={doctorName}
              displayEmpty
              onChange={(e) => setDoctorName(e.target.value)}
            >
              <MenuItem value="">None</MenuItem>
              {Object.values(doctotsNameList).map((name) => (
                <MenuItem key={name} value={name}>{name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Annuler</Button>
        <Button onClick={() => handleCreate(doctorName)}>Créer</Button>
      </DialogActions>
    </Dialog>
  </div>
  );
};

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

export default DoctorList;
