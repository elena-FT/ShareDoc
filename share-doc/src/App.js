import './App.css';
import Header from './header/header';
import { makeStyles } from '@material-ui/core/styles';
import HomePatient from './page-patient/home-patient';
import { GRAY } from './ressources/constants';
import {Route, BrowserRouter , Routes} from "react-router-dom";
import LoginPage from "./login/login-page";
import SignupPage from "./login/signup-page";
import {UserFactory} from './factories/user-factory'
import HomeDoctor from './page-doctor/page-doctor'



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

  const patientExists = localStorage.getItem('patient');


  /* rajoute un docteur
    const doctor = localStorage.getItem('doctor')
    var list = JSON.parse(doctor)
    list.push(UserFactory.createBasicDoctor())
    list = JSON.stringify(list);
    localStorage.setItem('doctor', list) 
  */
  /*
    var tableauJson = localStorage.getItem('doctor');
    var maListe = JSON.parse(tableauJson);
    maListe.splice(1, 1);
    var tableauMajEnJson = JSON.stringify(maListe);
    localStorage.setItem('doctor', tableauMajEnJson);
  */

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
      {/* TODO : Créer Header*/}
      <BrowserRouter>
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
