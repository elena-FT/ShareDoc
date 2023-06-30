import './App.css';
import Header from './header/header';
import { makeStyles } from '@material-ui/core/styles';
import HomePatient from './page-patient/home-patient';
import React, { useState, useEffect } from 'react';
import { UserFactory } from './factories/user-factory';

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
  // Déclarer un état local pour stocker les données
  const [data, setData] = useState('');
  const classes = useStyles();

  // Création de notre patient
  const patient = UserFactory.createBasicPatient()

  useEffect(() => {
    // Récupérer les données depuis localStorage au chargement de l'application
    const storedData = localStorage.getItem('patient');
    if (storedData) {
      setData(storedData);
    }
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
    }   else {
      // Aucune donnée trouvée dans le localStorage
      console.log('Aucun patient trouvé');
    }

    //localStorage.removeItem('myData'); // Supprimer les données de localStorage
    //setData(''); // Réinitialiser l'état
  };

  return (
    <div className={classes.app}>
      <Header patient={patient}/>
      <HomePatient patient={patient} />
      {/* <p>Données stockées : {data}</p>
      <button onClick={handleSaveData}>Enregistrer les données</button>
      <button onClick={handleClearData}>Effacer les données</button> */}
    </div>
  );
}

export default App;
