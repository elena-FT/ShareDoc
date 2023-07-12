import ButtonNew from '../components/button-new';
import DoctorList from './doctor-list';
import DocumentsPage from './documents-page';
import { makeStyles } from '@material-ui/core/styles';
import { useLocation } from 'react-router-dom';

function HomePatient() {
  const classes = useStyles();
  const email = useLocation().state.mail

  return (
    <div className={classes.home}>
      <div className={classes.left}>
        <ButtonNew emailPatient={email}/>
        <DoctorList emailPatient={email}/>
      </div>
      <DocumentsPage emailPatient={email}/>
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
