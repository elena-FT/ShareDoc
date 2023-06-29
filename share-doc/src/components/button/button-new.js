import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { BLUE_COLOR, BLUE_DARKEN_COLOR } from '../../ressources/constants'

const useStyles = makeStyles({
  roundedButton: {
    borderRadius: '50px',
    textTransform: 'none',
    backgroundColor: BLUE_COLOR,
    margin: '1rem',
    '&:hover': {
      backgroundColor: BLUE_DARKEN_COLOR
    },
  },
});

const ButtonNew = () => {
  const classes = useStyles();

  return (
    <div className="App">
      <Button variant="contained" color="primary" className={classes.roundedButton}>
        + Nouveau
      </Button>
    </div>
  );
};

export default ButtonNew;
