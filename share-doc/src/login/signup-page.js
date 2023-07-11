import React, {useState} from 'react'
import {Box, Container, FormControl, Input, InputLabel, MenuItem, Select, TextField} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {BLUE_COLOR} from "../ressources/constants";
import {focus} from "@testing-library/user-event/dist/focus";
import Button from "@material-ui/core/Button";
import {AccountCircle, Title} from "@material-ui/icons";
import {useNavigate} from 'react-router-dom';
import Typography from "@material-ui/core/Typography";
import {Grid} from "@mui/material";
import User from "../class/user";


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
        fontSize:'10px',
    }


});
const SignUpPage = () => {

    const navigate = useNavigate();
    const [role, setRole] = useState('')
    const [password, setPassword] = useState('')
    const [dateOfBirth, setDateOfBirth] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [socialSecurityNumber, setSecurityNumber] = useState('')
    const [callNumber, setCallNumber] = useState('')
    const [mail, setMail] = useState('')

    const classes = useStyles();
    const handleFirstNameChange = (event) => {
        setFirstName(event.target.value);
    };
    const handleLastNameChange = (event) =>{
        setLastName(event.target.value);
    }
     const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };
    const handleRoleChange = (event) =>{
        setRole(event.target.value);
    }
    const handlSubmitButton = (event) =>{
        const storedPatients = localStorage.getItem('patient');
        let patients = []
        if (storedPatients) {
            patients = JSON.parse(storedPatients)
            console.log(patients)
        }
        patients[patients.length + 1] = new User(firstName,lastName,dateOfBirth,mail,callNumber,password,false)
       localStorage.setItem('patient',JSON.stringify(patients));


    }
    const handleDateOfBirthChange = (event) =>{
        setDateOfBirth(event.target.value);
    }
    const handleCallNumberChange = (event) =>{
        setCallNumber(event.target.value);
    }
    const handleMailChange = (event) =>{
        setMail(event.target.value);
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
                            label="Nom"
                            value={lastName}
                            onChange={handleLastNameChange}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label="Prenom"
                            variant='outlined'
                            value={firstName}
                            onChange={handleFirstNameChange}
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <TextField
                            label="Date de naissance"
                            variant='outlined'
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
            </Box>

        </Container>
    );


}
export default SignUpPage;