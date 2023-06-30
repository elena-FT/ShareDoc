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

const FileList = ({ documents, folderName }) => {
  const files = documents.filter((document) => document.type === folderName);

  const getDocumentIcon = (format) => {
    console.log('Type', format)
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

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Type</TableCell>
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
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default FileList;
