import './App.css';
import Header from './header/header';
import { makeStyles } from '@material-ui/core/styles';
import HomePatient from './page-patient/home-patient';
import React, { useState, useEffect } from 'react';
import { UserFactory } from './factories/user-factory';
import { GRAY } from './ressources/constants';
import {Route, BrowserRouter , Routes} from "react-router-dom";
import LoginPage from "./login/login-page";
import SignupPage from "./login/signup-page";


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
  // Déclarer un état local pour stocker les données
  const [data, setData] = useState('');
  const classes = useStyles();

  // Création de notre patient
  const patient = UserFactory.createBasicPatient()

  // réinitialise les data (très utile)

  // localStorage.removeItem('patient');
  // const patientData = JSON.stringify(patient); // Convertir l'objet en une chaîne JSON
  // localStorage.setItem('patient', patientData); // Enregistrer les données dans localStorage
  // setData(patientData);

  useEffect(() => {
    // Récupérer les données depuis localStorage au chargement de l'application
    const storedData = localStorage.getItem('patient');
    if (storedData) {
      setData(storedData);
    }
    handleSaveData()
  }, []);

  const handleSaveData = () => {
    const patientData = JSON.stringify(patient); // Convertir l'objet en une chaîne JSON
    localStorage.setItem('patient', patientData); // Enregistrer les données dans localStorage
    setData(patientData); // Mettre à jour l'état avec les nouvelles données
  };

  const handleClearData = () => {
    // Récupérer la chaîne JSON depuis le localStorage
    const patientData = localStorage.getItem('patient');

    if (patientData) {
      // Convertir la chaîne JSON en objet
      const patient = JSON.parse(patientData);

      // Utiliser l'objet patient
      console.log(patient.firstName); // Affiche "John"

      const newPatient = JSON.parse(UserFactory.createBasicPatient());
      localStorage.setItem('patient', newPatient); // Enregistrer les données dans localStorage
      setData(newPatient)
    }   else {
      // Aucune donnée trouvée dans le localStorage
      console.log('Aucun patient trouvé');
    }

    //localStorage.removeItem('myData'); // Supprimer les données de localStorage
    //setData(''); // Réinitialiser l'état
  };

  return (
    <div className={classes.app}>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage/>}></Route>
          <Route path="/signup" element={<SignupPage/>}></Route>
          <Route path="/homepatient" element={<HomePatient/>}></Route>
        </Routes>
      </BrowserRouter>

      <p>Données stockées : {data}</p>
      {/* <button onClick={handleSaveData}>Enregistrer les données</button>
      <button onClick={handleClearData}>Réinitialise les données</button> */}
    </div>
  );
}

export default App;
