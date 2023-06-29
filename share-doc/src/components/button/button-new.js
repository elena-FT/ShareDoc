import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  roundedButton: {
    borderRadius: '50px',
    textTransform: 'none',
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
