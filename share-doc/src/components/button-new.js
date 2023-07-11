import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { BLUE_COLOR, BLUE_DARKEN_COLOR } from '../ressources/constants';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import { Document } from '../class/document';
import DocumentTypes from '../ressources/documentTypes';
import FormatDocument from '../ressources/formatDocument.js';

// TODO : gérer la création d'un nouveau dossier
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const images = [
  {
    url: '/static/images/buttons/breakfast.jpg',
    title: 'Breakfast',
    width: '40%',
  },
  {
    url: '/static/images/buttons/burgers.jpg',
    title: 'Burgers',
    width: '30%',
  },
  {
    url: '/static/images/buttons/camera.jpg',
    title: 'Camera',
    width: '30%',
  },
];

const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  height: 200,
  [theme.breakpoints.down('sm')]: {
    width: '100% !important', // Overrides inline-style
    height: 100,
  },
  '&:hover, &.Mui-focusVisible': {
    zIndex: 1,
    '& .MuiImageBackdrop-root': {
      opacity: 0.15,
    },
    '& .MuiImageMarked-root': {
      opacity: 0,
    },
    '& .MuiTypography-root': {
      border: '4px solid currentColor',
    },
  },
}));

const ImageSrc = styled('span')({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: 'cover',
  backgroundPosition: 'center 40%',
});

const Image = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.common.white,
}));

const ImageBackdrop = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: theme.palette.common.black,
  opacity: 0.4,
  transition: theme.transitions.create('opacity'),
}));

const ImageMarked = styled('span')(({ theme }) => ({
  height: 3,
  width: 18,
  backgroundColor: theme.palette.common.white,
  position: 'absolute',
  bottom: -2,
  left: 'calc(50% - 9px)',
  transition: theme.transitions.create('opacity'),
}));

 const uploadFileToDB = (event) => {

 const patientData = localStorage.getItem('patient');

  if (!patientData) {
    console.log('Aucun patient trouvé');
    
  } else {
    const patient = JSON.parse(patientData);
    console.log(patient.firstName);

    const file = event.target.files[0]; // Récupérer le fichier sélectionné
    console.log(file);

    const reader = new FileReader();
    reader.onload = function (event) {
      const fileContent = event.target.result; // Récupérer le contenu du fichier

      console.log(fileContent);

      // TODO : rajouter le choix du type
      const type = DocumentTypes.Autres;

      const parts = file.name.split('.');
      const ext = parts[parts.length - 1];
      let format = null;

      for (const key in FormatDocument) {
        if (FormatDocument[key] === ext) {
          format = key;
          break;
        }
      }

      const path = 'IRM/' + file.name;
  
      const newDoc = new Document(file.name, path, new Date(), type, format, fileContent);
  
      patient.documents.push(newDoc);
      const updatedPatientData  = JSON.stringify(patient);
      localStorage.setItem('patient', updatedPatientData );

      console.log('Le fichier a été ajouté à la base de données.');
    }

    reader.readAsDataURL(file);
  }
}

const ButtonNew = ({ emailPatient }) => {
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <input type="file" id="fileInput" style={{ display: 'none' }} onChange={uploadFileToDB} />
      <Button variant="contained" color="primary" className={classes.roundedButton} onClick={() => document.getElementById('fileInput').click()}>
        + Nouveau
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Nouveau"}</DialogTitle>
        <DialogActions>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', minWidth: 300, width: '100%' }}>
          {images.map((image) => (
            <ImageButton
              focusRipple
              key={image.title}
              style={{
                width: image.width,
              }}
            >
              <ImageSrc style={{ backgroundImage: `url(${image.url})` }} />
              <ImageBackdrop className="MuiImageBackdrop-root" />
              <Image>
                <Typography
                  component="span"
                  variant="subtitle1"
                  color="inherit"
                  sx={{
                    position: 'relative',
                    p: 4,
                    pt: 2,
                    pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                  }}
                >
                  {image.title}
                  <ImageMarked className="MuiImageMarked-root" />
                </Typography>
              </Image>
            </ImageButton>
          ))}
        </Box>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ButtonNew;




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
