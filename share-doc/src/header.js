import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { BLUE_COLOR } from './ressources/constants'; 

const Header = () => {
  return (
    <AppBar position="static" style={{ backgroundColor: BLUE_COLOR }}>
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
            <img src="./logo.png"/>
        </IconButton>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Share Doc
        </Typography>
        <IconButton color="inherit" aria-label="user">
            <img src="./logo.png"/>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
