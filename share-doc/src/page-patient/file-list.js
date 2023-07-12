import React from 'react';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import IconButton from '@material-ui/core/IconButton';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import ImageIcon from '@mui/icons-material/Image';
import Chip from '@material-ui/core/Chip';
import { BLUE_COLOR } from './../ressources/constants'; 
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DownloadIcon from '@mui/icons-material/Download';
import EditDoc from './edit-doc.js'


const FileList = ({ emailPatient, documents, folderName, folders }) => {
  const files = documents.filter((document) => document.type === folderName);
  const [openEdit, setOpenEdit] = React.useState(false);
  var fileToEdit = null;

  const getDocumentIcon = (format) => {
    switch (format) {
      case 'pdf':
        return <PictureAsPdfIcon />;
      case 'png' || 'jpg':
        return <ImageIcon />;
      default:
        return <InsertDriveFileIcon />;
    }
  };

  const formatDateString = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // TODO : not the right file sen to be modified
  const handleEditFile = (file) => {
    console.log('clicked on modified ' + file)
    if (file) {
      console.log('open: ' + file)
      fileToEdit = file
      console.log('fte = ' + fileToEdit)
      setOpenEdit(!openEdit);
      file = ''
    }
  };

  // TODO : not functional, remove ???????????????
  const openFile = (path) => {
    const storedPatients = localStorage.getItem('patient');

    if (!storedPatients) {
      console.log('Db patient not found');
      return;
    }

    const patients = JSON.parse(storedPatients);
    const patient = Object.values(patients).find(patient=> patient.mail === emailPatient);

    if (!patient) {
      console.log('Patient not found');
      return;
    }

    const doc = patient.documents.find(obj => obj.path === path);
    if (!doc) {
      console.log('Document doesn\'t exists in the LocalStorage')
      return;
    }

    const fileData = new Blob([doc.data], { type: 'application/octet-stream' });

    // Créer une URL blob pour le fichier
    const fileURL = URL.createObjectURL(fileData);

    // Ouvrir le fichier dans une nouvelle fenêtre ou un nouvel onglet
    window.open(fileURL);
  }

  // TODO : not entirely functional
  const downloadFile = (path) => {
    const storedPatients = localStorage.getItem('patient');

    if (!storedPatients) {
      console.log('Db patient not found');
      return;
    }

    const patients = JSON.parse(storedPatients);
    const patient = Object.values(patients).find(patient=> patient.mail === emailPatient);

    if (!patient) {
      console.log('Patient not found');
      return;
    }

    const doc = patient.documents.find(obj => obj.path === path);
    if (!doc) {
      console.log('Document doesn\'t exists in the LocalStorage')
      return;
    }

    const fileData = new Blob([doc.data], { type: 'application/octet-stream' });

    // Créer une URL blob pour le fichier
    const fileURL = URL.createObjectURL(fileData);

    // Créer un élément <a> pour déclencher le téléchargement
    const downloadLink = document.createElement('a');
    downloadLink.href = fileURL;
    downloadLink.download = doc.name;

    // Simuler un clic sur le lien pour démarrer le téléchargement
    downloadLink.click();

    // Libérer l'URL blob après le téléchargement
    URL.revokeObjectURL(fileURL);
  }
  
  return (
    <div>
      { /* always null, use the first file to modified for now */ }
      {console.log('fte = ' + fileToEdit)}
      {openEdit && <EditDoc emailPatient={emailPatient} file={files[0]} /*file={fileToEdit}*/ folders={folders} />}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Nom</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Modifier</TableCell>
              <TableCell>Ouvrir</TableCell>
              <TableCell>Télécharger</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {files.map((file) => (
              <TableRow key={file.name}>
                <TableCell>
                  <IconButton>{getDocumentIcon(file.format)}</IconButton>
                </TableCell>
                <TableCell>{file.name}</TableCell>
                <TableCell>{formatDateString(file.dateAdded)}</TableCell>
                <TableCell>
                  <Chip
                    label={file.type}
                    style={{ backgroundColor: BLUE_COLOR, color: 'white' }}
                  />
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEditFile(file.path)}>
                    <EditIcon />
                  </IconButton>
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => openFile(file.path)}>
                    <VisibilityIcon />
                  </IconButton>
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => downloadFile(file.path)}>
                    <DownloadIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default FileList;
