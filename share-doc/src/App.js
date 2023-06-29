import './App.css';
import ButtonNew from './components/button/button-new';
import Header from './header';
import DoctorList from './page-patient/doctor-list';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  app: {
    display: 'flex',
    flexDirection: 'column',
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

function App() {
  const classes = useStyles();

  return (
    <div className={classes.app}>
      <Header />
      <div className={classes.left}>
        <ButtonNew />
        <DoctorList />
      </div>
    </div>
  );
}

export default App;
