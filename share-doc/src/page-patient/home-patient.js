import ButtonNew from '../components/button/button-new';
import DoctorList from './doctor-list';
import DocumentsPage from './documents-page';
import { makeStyles } from '@material-ui/core/styles';

function HomePatient( { patient }) {
  const classes = useStyles();
  console.log('patient', patient)

  return (
    <div className={classes.home}>
      <div className={classes.left}>
        <ButtonNew />
        <DoctorList doctors={patient.doctors}/>
      </div>
      <DocumentsPage patient={patient}/>
    </div>
  );
}

export default HomePatient;


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