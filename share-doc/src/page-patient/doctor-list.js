import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';


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
  const classes = useStyles();

  const doctors = [
    { id: 1, name: 'Dr. John Doe' },
    { id: 2, name: 'Dr. Jane Smith' },
    { id: 3, name: 'Dr. David Johnson' },
  ];

  const handleDoctorClick = (doctorId) => {
    console.log('Clicked doctor:', doctorId);
  };

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Liste des docteurs
        </Typography>
        {doctors.map((doctor) => (
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
  );
};

export default DoctorList;
