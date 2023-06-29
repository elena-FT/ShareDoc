import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { BLUE_COLOR } from './ressources/constants'; 
import logo from "./assets/logo.png";
import test from "./assets/test.png";

const Header = () => {
  return (
    <AppBar position="static" style={{ backgroundColor: BLUE_COLOR }}>
      <Toolbar>
        <img src={logo} alt={"Logo"} style={{ width: 45}} />
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Share Doc
        </Typography>
        <IconButton color="inherit" aria-label="user">
            <img src={test}  alt={"profil"} style={{ width: 45}}/>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
