import ButtonNew from '../components/button-new';
import DoctorList from './doctor-list';
import DocumentsPage from './documents-page';
import { makeStyles } from '@material-ui/core/styles';
import { useLocation } from 'react-router-dom';
import {BLUE_COLOR} from "../ressources/constants";

function HomePatient() {
  const classes = useStyles();
  const email = useLocation().state.mail

  return (
    <div className={classes.home}>
      <div className={classes.left}>
        <ButtonNew style={{marginLeft:'20px'}} emailPatient={email}/>
        <DoctorList  emailPatient={email}/>
      </div>
      <DocumentsPage emailPatient={email}/>
    </div>
  );
}

export default HomePatient;


const useStyles = makeStyles({
    home: {
      display: 'flex',
      alignItems: 'space-between',
      width: '100%',
    },
    left: {
      paddingLeft:'20px',
        paddingTop:'20px',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: BLUE_COLOR,
      alignItems: 'center',
      width: '30%',
      height:'100vh',


    },
  });
