import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import EditIcon from '@mui/icons-material/Edit';
import { BLUE_COLOR } from './../ressources/constants';
import Box from '@mui/material/Box';
import Popper from '@mui/material/Popper';
import EditProfileDialog from './edit-profile'
import SettingsDialog from './settings';

export default function ProfileDialog({ patient }) {
    const [open, setOpen] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [placement, setPlacement] = React.useState();
    const [openEdit, setOpenEdit] = React.useState(false);
    const [openSetting, setOpenSetting] = React.useState(false);
  
    const handleClickOpen = (newPlacement) => (event) => {
      setAnchorEl(event.currentTarget);
      setOpen((prev) => placement !== newPlacement || !prev);
      setPlacement(newPlacement);
    };
  
    const handleClose = () => {
      setOpen(!open);
    };

    const handleEditProfile = () => {
        setOpen(!open);
        setOpenEdit(!openEdit)
    }

    const handleSettings = () => {
        setOpen(!open);
        setOpenSetting(!openSetting)
    }

return (
    <div>
        {openEdit && <EditProfileDialog />}
        {openSetting && <SettingsDialog />}
        <Box sx={{ width: 50 }}>
            <IconButton color="inherit" aria-label="user" variant="outlined" onClick={handleClickOpen('bottom-end')} >
                <AccountCircleIcon  alt={"profil"} style={{ fontSize: 35 }}/>
            </IconButton>
            <Popper 
                open={open}
                anchorEl={anchorEl}
                placement={placement}
                transition
                disablePortal 
                keepMounted
                onClose={handleClose}
            >
                {({ TransitionProps, placement }) => (
                    <Slide
                        {...TransitionProps}
                        direction="left"
                        sx={{
                            transformOrigin: {
                                vertical: 'top',
                                horizontal: 'right',
                            },
                        }}
                    >
                        <div
                            style={{
                                marginTop: 15,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                color: 'black',
                                background: 'white',
                                boxShadow: '0px 0px 10px 5px rgba(0, 0, 0, 0.3)',
                                borderRadius: '20px',
                            }}
                        >
                            <AccountCircleIcon  alt={"profil"} style={{ fontSize: 70, color: BLUE_COLOR, marginTop: 20 }}/>
                            <DialogTitle>{patient.firstName + ' ' + patient.lastName}</DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-slide-description">
                                    <strong>N° de sécurité social</strong><br />
                                    {patient.socialSecurityNumber}
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <ButtonGroup
                                    orientation="vertical"
                                    aria-label="vertical contained button group"
                                    variant="text"
                                    style={{ width: '100%' }}
                                >
                                    <IconButton color="inherit" aria-label="user" variant="outlined" onClick={handleEditProfile} style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                                        <EditIcon  alt={"edit"} style={{ fontSize: 20, color: BLUE_COLOR }}/>
                                        <span style={{ fontSize: 14, marginLeft: 10 }}>Modifier le profil</span>
                                    </IconButton>
                                    <IconButton color="inherit" aria-label="user" variant="outlined" onClick={handleSettings} style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }} >
                                        <SettingsIcon  alt={"setting"} style={{ fontSize: 20, color: BLUE_COLOR }}/>
                                        <span style={{ fontSize: 14, marginLeft: 10 }}>Paramètre</span>
                                    </IconButton>
                                    <hr style={{ width: '100%', borderColor: BLUE_COLOR }} />
                                    <Button onClick={handleClose}>Se déconnecter</Button>
                                </ButtonGroup>
                            </DialogActions>
                        </div>
                    </Slide>
                    )}
                </Popper>
            </Box>
        </div>
    );
}