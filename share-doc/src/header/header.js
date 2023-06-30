import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import ProfileDialog from './profile.js'
import Typography from '@material-ui/core/Typography';
import { BLUE_COLOR } from './../ressources/constants'; 
import logo from "./../assets/logo.png";

const Header = ({ patient }) => {
  return (
    <AppBar position="static" style={{ backgroundColor: BLUE_COLOR }}>
      <Toolbar>
        <img src={logo} alt={"Logo"} style={{ width: 45}} />
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Share Doc
        </Typography>
        <ProfileDialog patient={patient}/>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
