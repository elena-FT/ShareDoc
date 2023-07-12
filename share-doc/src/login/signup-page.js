import React, {useState} from 'react'
import {Box, Container, InputLabel, MenuItem, Select, TextField} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {BLUE_COLOR} from "../ressources/constants";
import Button from "@material-ui/core/Button";
import {useNavigate} from 'react-router-dom';
import Typography from "@material-ui/core/Typography";
import {Alert, Grid} from "@mui/material";
import Doctor from '../class/doctor.js';
import Patient from "../class/patient.js";
import * as PropTypes from "prop-types";


const useStyles = makeStyles({

    root: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh'
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '400px',
        alignItems: 'center',
        justifyContent: "center",
        gap: '30px',
        margin: 'auto',
        boxShadow: '5px 5px 10px #ccc',
        padding: '20px',
        borderRadius: '5px'
    },
    submitButton: {
        marginTop: '2px',
        backgroundColor: BLUE_COLOR
    },
    select: {
        width: '100px'
    },

    input: {
        borderRadius: '20px',
        height: '10px'
    },
    h2: {
        marginLeft: '10px'
    },
    signup: {
        fontSize: '10px',
    }


});

function CheckCircleOutlineIcon(props) {
    return null;
}

CheckCircleOutlineIcon.propTypes = {fontSize: PropTypes.string};
const SignUpPage = () => {

    const navigate = useNavigate();
    const [alert,setAlert] = useState(false)
    const [role, setRole] = useState('')
    const [password, setPassword] = useState('')
    const [dateOfBirth, setDateOfBirth] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [socialSecurityNumber, setSecurityNumber] = useState('')
    const [userName, setUsername] = useState('')
    const [callNumber, setCallNumber] = useState('')
    const [mail, setMail] = useState('')

    const classes = useStyles();
    const handleFirstNameChange = (event) => {
        setFirstName(event.target.value);
    };
    const handleSecurityNumberChange = (event) =>{
        setSecurityNumber(event.target.value);
    }
    const handleUserNameChange = (event) =>{
        setUsername(event.target.value);
    }
    const handleLastNameChange = (event) => {
        setLastName(event.target.value);
    }
    function handleSetAlert() {
        setAlert(true);
    }
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };
    const handleRoleChange = (event) => {
        setRole(event.target.value);
    }
    const handlSubmitButton = (event) => {
        const storedPatients = localStorage.getItem('patient');
        const storedDoctors = localStorage.getItem('doctor');
       
        let patients = []
        let doctors = []
        if (storedPatients) {
            var newPatient = null;
            var newDoctor = null;
            var  data = []
            patients = JSON.parse(storedPatients)
            doctors = JSON.parse(storedDoctors)
            switch (role) {
                case "medecin":
                    newDoctor = new Doctor(firstName, lastName, callNumber, mail, password);
                    data = [...doctors, newDoctor]
                    localStorage.setItem("doctor", JSON.stringify(data))
                    handleSetAlert();

                    break;
                case "patient":
                    newPatient = new Patient(firstName, lastName, callNumber, mail, password, dateOfBirth, socialSecurityNumber);
                    data = [...patients, newPatient]
                    localStorage.setItem("patient", JSON.stringify(data))
                    handleSetAlert();
                    break;
                default: 
                    console.log('need to select');
                    break;

            }
        }
    }
    const handleDateOfBirthChange = (event) => {
        setDateOfBirth(event.target.value);
    }
    const handleCallNumberChange = (event) => {
        setCallNumber(event.target.value);
    }
    const handleMailChange = (event) => {
        setMail(event.target.value);
    }
    const handleBackLogin = (event) =>{
        navigate("/")
    }
    return (
        <Container className={classes.root}>
            <Box className={classes.form}>
                <Typography variant="h5">Créer son compte</Typography>
                <InputLabel id="role-label">Vous êtes?</InputLabel>
                <Select labelId="role-label" onChange={handleRoleChange}
                        className={classes.select} label="Vous êtes? " displayEmpty value={role}
                >
                    <MenuItem value="medecin">Medecin</MenuItem>
                    <MenuItem value="patient">Patient</MenuItem>
                </Select>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField
                            className={classes.field}
                            variant='outlined'
                            label="Prénom"
                            value={firstName}
                            onChange={handleFirstNameChange}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label="Nom de famille"
                            variant='outlined'
                            value={lastName}
                            onChange={handleLastNameChange}
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <TextField
                            variant='outlined'
                            disabled={role === 'medecin'}
                            type='date'
                            value={dateOfBirth}
                            onChange={handleDateOfBirthChange}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label="Adresse mail"
                            variant='outlined'
                            value={mail}
                            onChange={handleMailChange}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label="Pseudo"
                            variant='outlined'
                            value={userName}
                            onChange={handleUserNameChange}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label="No. Securité Sociale"
                            variant='outlined'
                            type='number'
                            disabled={role === 'medecin'}
                            value={socialSecurityNumber}
                            onChange={handleSecurityNumberChange}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label="Telephone portable"
                            variant='outlined'
                            value={callNumber}
                            onChange={handleCallNumberChange}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label="Mot de passe"
                            variant='outlined'
                            type="password"
                            value={password}
                            onChange={handlePasswordChange}
                        />
                    </Grid>

                </Grid>


                <Button
                    className={classes.submitButton}
                    color="red"
                    type="submit"
                    variant='contained'
                    onClick={handlSubmitButton}

                >
                    Creer un compte
                </Button>
                <Button onClick={handleBackLogin} className={classes.signup}>Retour à la page login</Button>
                { alert && <Alert
                    iconMapping={{
                        success: <CheckCircleOutlineIcon fontSize="inherit" />,
                    }}
                >
                    {firstName}, votre compte a bien été créé.
                </Alert> }
            </Box>

        </Container>
    );


}
export default SignUpPage;