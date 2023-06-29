import './App.css';
import ButtonNew from './components/button/button-new';
import Header from './header';
import DoctorList from './page-patient/doctor-list';
import DocumentsPage from './page-patient/documents-page';
import { makeStyles } from '@material-ui/core/styles';
import HomePatient from './page-patient/home-patient';
import { User } from "./class/user";
import React, { useState, useEffect } from 'react';

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
  const [data, setData] = useState('');

  useEffect(() => {
    // Récupérer les données depuis localStorage au chargement de l'application
    const storedData = localStorage.getItem('myData');
    if (storedData) {
      setData(storedData);
    }
  }, []);

  const handleSaveData = () => {
    const newData = 'Hello, world!'; // Données à stocker
    localStorage.setItem('myData', newData); // Enregistrer les données dans localStorage
    setData(newData); // Mettre à jour l'état avec les nouvelles données
  };

  const handleClearData = () => {
    localStorage.removeItem('myData'); // Supprimer les données de localStorage
    setData(''); // Réinitialiser l'état
  };

  const classes = useStyles();
  const patient = new User('Simon', 'Bouvier', '1990-01-01', 1, 'simon.bouvier@gmail.com', '1234');

  return (
    <div className={classes.app}>
      <Header />
      <HomePatient patient={patient} />
      <p>Données stockées : {data}</p>
      <button onClick={handleSaveData}>Enregistrer les données</button>
      <button onClick={handleClearData}>Effacer les données</button>
    </div>
  );
}

export default App;
