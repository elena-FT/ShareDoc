import React from 'react';
import Card from '@material-ui/core/Card';
import { Document } from '../class/document';
import DocumentTypes from '../ressources/documentTypes';

const DocumentsPage = ({ documents }) => {
    const styles = {
        fontFamily: "Open Sans, sans-serif",
        fontSize: "1rem",
        p: {
            color: "gray",
            fontSize: "1rem",
            fontWeight: "smaller"
        }
    };

    // Fonction pour récupérer les détails des documents à partir de leurs IDs
    const getDocumentDetails = (documentId) => {
        const database = [
            new Document('Document1', new Date(), 300, DocumentTypes.IRM, 1),
            new Document('Document2', new Date(), 301, DocumentTypes.IRM, 2),
          ];
        
          // Recherche du document correspondant à l'ID dans la base de données
          const document = database.find((doc) => doc.id === documentId);
        
          // Retourne les détails du document s'il est trouvé, sinon retourne null
          return document || null;
    };

    return (
        <div style={styles}>
            <h1>Documents de santé</h1>
            <p>
                Retrouvez ici vos documents partagés.
            </p>
            <div>
                {documents.map((documentId) => {
                const documentDetails = getDocumentDetails(documentId);

                if (documentDetails) {
                    return <p> {documentDetails.name} </p>;
                }

                return null; // ou affichez un message d'erreur si le document n'est pas trouvé
                })}
            </div>
        </div>
    );
};

export default DocumentsPage;
