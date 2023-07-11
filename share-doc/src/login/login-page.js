import React, {useState} from 'react'
import {Box, Container, FormControl, Input, InputLabel, MenuItem, Select, TextField} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {BLUE_COLOR} from "../ressources/constants";
import {focus} from "@testing-library/user-event/dist/focus";
import Button from "@material-ui/core/Button";
import {AccountCircle, Title} from "@material-ui/icons";
import {useNavigate} from 'react-router-dom';
import Typography from "@material-ui/core/Typography";
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
    },
    h2: {
        marginLeft: '10px'
    },
    signup: {
        fontSize:'10px',
    }


});
const LoginPage = () => {

    const navigate = useNavigate();
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('Patient')
    const classes = useStyles();
    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };
    const handleRoleChange = (event) =>{
        setRole(event.target.value);
    }
    const handleSignupButton = (event) =>{
        navigate("/signup")
        switch (role){
            case "patient":
                const storedPatients = localStorage.getItem('patient');
                if (storedPatients){
                    const patients = JSON.parse(storedPatients);
                    console.log(patients)
                    const patient = Object.values(patients).find(patient=> patient.mail === username && patient.password === password)
                    if (patient)
                        navigate("/homepatient")
                    else
                        console.log('Connais pas !')
                }
        }
    }
    const handlSubmitButton = (event) => {
        switch (role){
            case "patient":
                navigate('/homepatient');
                break;
            case "medecin":
                navigate('/homedoctor')
                break;

        }

    }
    return (
        <Container className={classes.root}>
            <Box className={classes.form}>
                <Typography variant="h5">Se connecter</Typography>
                <TextField
                    className={classes.field}
                    variant='outlined'
                    label="Nom d'utilisateur"
                    value={username}
                    onChange={handleUsernameChange}

                />
                <TextField
                    label="Mot de passe"
                    variant='outlined'
                    type="password"
                    value={password}
                    onChange={handlePasswordChange}
                />
                <InputLabel id="role-label">Vous êtes?</InputLabel>
                <Select labelId="role-label" onChange={handleRoleChange}
                        className={classes.select} label="Vous êtes? " displayEmpty value={role}
                >
                    <MenuItem value="medecin">Medecin</MenuItem>
                    <MenuItem value="patient">Patient</MenuItem>
                </Select>
                <Button
                    className={classes.submitButton}
                    color="red"
                    type="submit"
                    variant='contained'
                    onClick={handlSubmitButton}

                >
                    Se connecter
                </Button>
                <Button onClick={handleSignupButton} className={classes.signup}>Nouveau? Creer un compte</Button>
            </Box>

        </Container>
    );


}
export default LoginPage;