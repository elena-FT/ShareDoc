import React, {useState} from 'react'
import {Box, Container, Input, TextField} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {BLUE_COLOR} from "../ressources/constants";
import {focus} from "@testing-library/user-event/dist/focus";
import Button from "@material-ui/core/Button";


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
        gap: '20px',
        margin: 'auto'
    },
    submitButton: {
        marginTop: '2px',
    },
    cont: {
        width:'300px',
        height: '300px',
        display: 'flex',
        alignItems: 'center',

        backgroundColor:BLUE_COLOR,
        borderRadius:'20px'
    }


});
const LoginPage = () =>{
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const classes = useStyles();
    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

    };

    return (
        <Container className={classes.root}>
            <Container className={classes.cont}>

            <form  className={classes.form} onSubmit={handleSubmit}>
                <text>Connectez vous</text>
                <TextField
                    label="Nom d'utilisateur"
                    variant="outlined"
                    value={username}
                    onChange={handleUsernameChange}
                />
                <TextField
                    label="Mot de passe"
                    variant="outlined"
                    type="password"
                    value={password}
                    onChange={handlePasswordChange}
                />
                <Button
                    className={classes.submitButton}
                    variant="contained"
                    color="red"
                    type="submit"
                >
                    Se connecter
                </Button>
            </form>
            </Container>

            </Container>
    );


}
export default LoginPage;