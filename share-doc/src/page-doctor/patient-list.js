import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import {Avatar, CardMedia} from "@material-ui/core";
import {BLUE_COLOR} from "../ressources/constants";
import ButtonNew from "../components/button/button-new";
import ButtonViewdocs from "../components/button/button-viewdocs";


const useStyles = makeStyles({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '100px',
        margin: '50px',
    },
    icon: {
        color: 'lightgrey',
    },
    card: {
        marginBottom: '1rem',
        textAlign: 'center',
        borderRadius: '20px',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        width: 200,
        backgroundColor: BLUE_COLOR
    },
    media: {
        height: 140
    },
    avatar: {
        margin: 'auto'
    }
});


const PatientList = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Card className={classes.card}>
                <CardMedia
                    className={classes.media}
                    image="https://example.com/image1.jpg"
                    title="Image 1"
                />
                <CardContent>
                    <Avatar className={classes.avatar} src="../assets/macron.png">
                    </Avatar>
                    <Typography variant="body2" component="p">
                        Emmanuel Macron
                    </Typography>

                    <ButtonViewdocs/>
                </CardContent>
            </Card>

            <Card className={classes.card}>
                <CardMedia
                    className={classes.media}
                    image="https://example.com/image2.jpg"
                    title="Image 2"
                />
                <CardContent>
                    <Avatar className={classes.avatar} src="../assets/macron.png">
                    </Avatar>
                    <Typography variant="body2" component="p">
                        Nicolas Sarkozy
                    </Typography>

                    <ButtonViewdocs/>
                </CardContent>
            </Card>

            <Card className={classes.card}>
                <CardMedia
                    className={classes.media}
                    image="https://example.com/image3.jpg"
                    title="Image 3"
                />
                <CardContent>
                    <Avatar className={classes.avatar} src="../assets/macron.png">
                    </Avatar>
                    <Typography variant="body2" component="p">
                        Jacques Chirac
                    </Typography>

                    <ButtonViewdocs/>
                </CardContent>
            </Card>
        </div>
    )
};

export default PatientList;