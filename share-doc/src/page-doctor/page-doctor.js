import ButtonNew from '../components/button-new';
import tList from './patient-list';
import DocumentsPage from '../page-patient/documents-page';
import { makeStyles } from '@material-ui/core/styles';
import { useLocation } from 'react-router-dom';
import Header from '../header/header';
import PatientList from './patient-list';
import React, { createContext, useState } from 'react';

export const MyContext = createContext();

function HomeDoctor() {
  const [patientBouton, SetPatientBouton] = useState('');

  const classes = useStyles();

  const email = useLocation().state.mail

  const storedDoctors = localStorage.getItem('doctor');
  const doctors = JSON.parse(storedDoctors)
  const doctor = Object.values(doctors).find(doctor=> doctor.mail === email)

  return (
      <div className={classes.home}>
        <div className={classes.left}>
        <ButtonNew emailPatient={patientBouton}/>
        <MyContext.Provider value={{patientBouton, SetPatientBouton}}>
          <PatientList emailPatient={email}/>
        </MyContext.Provider>
        </div>
          <DocumentsPage emailPatient={email}/>
 
      </div>
  );
}
//<DoctorList emailPatient={email}/>
//<DocumentsPage emailPatient={email}/>
export default HomeDoctor;


const useStyles = makeStyles({
    home: {
      display: 'flex',
      alignItems: 'flex-start',
      width: '100%',
    },
    left: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      width: '30%',
      marginLeft: '2rem',
      marginTop: '2rem',
    },
  });
