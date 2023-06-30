import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Button from '@mui/material/Button';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import EditIcon from '@mui/icons-material/Edit';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

export default function ProfileDialog( { patient } ) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
 
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
        <IconButton color="inherit" aria-label="user" variant="outlined" onClick={handleClickOpen} >
            <AccountCircleIcon  alt={"profil"} style={{ fontSize: 35 }}/>
        </IconButton>
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
        >
            <AccountCircleIcon  alt={"profil"} style={{ fontSize: 70 }}/>
            <DialogTitle>{patient.firstName + ' ' + patient.lastName}</DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
                N° de sécurité social<br />
                {patient.socialSecurityNumber}
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <IconButton color="inherit" aria-label="user" variant="outlined" onClick={handleClose} >
                <EditIcon  alt={"edit"} style={{ fontSize: 30 }}/>
                Modifier le profil
            </IconButton>
            <IconButton color="inherit" aria-label="user" variant="outlined" onClick={handleClose} >
                <SettingsIcon  alt={"setting"} style={{ fontSize: 30 }}/>
                Paramètre
            </IconButton>
            <Button onClick={handleClose}>Se déconnecter</Button>
            </DialogActions>
        </Dialog>
        </div>
    );
}
