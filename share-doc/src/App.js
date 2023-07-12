import './App.css';
import Header from './header/header';
import { makeStyles } from '@material-ui/core/styles';
import HomePatient from './page-patient/home-patient';
import { GRAY } from './ressources/constants';
import {Route, BrowserRouter , Routes} from "react-router-dom";
import LoginPage from "./login/login-page";
import HomeDoctor from "./page-doctor/page-doctor"; 
import SignupPage from "./login/signup-page";
// import { useLocation } from 'react-router-dom';


const useStyles = makeStyles({
  app: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '100%',
    minHeight: '100vh', // Définit la hauteur de la div en utilisant l'unité vh
    backgroundColor: GRAY 
  },
});

function App() {
  const classes = useStyles();
  // const location = useLocation();

  const patientExists = localStorage.getItem('patient');

  if (!patientExists) {

    // Création de nos DB 
    const patients = [];
    const doctors = [];

    const patientJSON = JSON.stringify(patients);
    const doctorJSON = JSON.stringify(doctors);

    // Enregistrer les données dans localStorage
    localStorage.setItem('patient', patientJSON);
    localStorage.setItem('doctor', doctorJSON);
  }

  return (
    <div className={classes.app}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<LoginPage/>}></Route>
          <Route path="/signup" element={<SignupPage/>}></Route>
          <Route path="/homepatient" element={<HomePatient/>}></Route>
          <Route path="/homedoctor" element={<HomeDoctor/>}></Route>
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
