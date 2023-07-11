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
import {Alert, AlertTitle} from "@mui/material";


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
    const [mail, setMail] = useState('')
    const [password, setPassword] = useState('')
    const [alert, setAlert] = useState(false);
    const [role, setRole] = useState('Patient')
    const classes = useStyles();
    const handleMailChange = (event) => {
        setMail(event.target.value);
    };
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };
    const handleRoleChange = (event) =>{
        setRole(event.target.value);
    }
    function handleSetAlert(){
        setAlert(true)
    }
    const handleSignupButton = (event) =>{
        navigate("/signup")

    }
    const handlSubmitButton = (event) => {
        switch (role){
            case "patient":
                const storedPatients = localStorage.getItem('patient');
                if (storedPatients){
                    const patients = JSON.parse(storedPatients);
                    const patient = Object.values(patients).find(patient=> patient.mail === mail && patient.password === password)
                    if (patient)
                        navigate("/homepatient", {
                            state : {
                                mail
                            }
                        })
                    else
                        handleSetAlert();
                }
        }

    }
    return (
        <Container className={classes.root}>
            <Box className={classes.form}>
                <Typography variant="h5">Se connecter</Typography>
                <InputLabel id="role-label">Vous êtes?</InputLabel>
                <Select labelId="role-label" onChange={handleRoleChange}
                        className={classes.select} label="Vous êtes? " displayEmpty value={role}
                >
                    <MenuItem value="medecin">Medecin</MenuItem>
                    <MenuItem value="patient">Patient</MenuItem>
                </Select>
                <TextField
                    className={classes.field}
                    variant='outlined'
                    label="Nom d'utilisateur"
                    value={mail}
                    onChange={handleMailChange}

                />
                <TextField
                    label="Mot de passe"
                    variant='outlined'
                    type="password"
                    value={password}
                    onChange={handlePasswordChange}
                />
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
                { alert && <Alert severity="error">
                    <AlertTitle>Error</AlertTitle>
                    Erreur de <strong>connexion</strong>
                </Alert>}
            </Box>

        </Container>
    );


}
export default LoginPage;