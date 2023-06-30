import React from 'react';
import Card from '@material-ui/core/Card';

const DocumentsPage = ({ patient }) => {
    const styles = {
        fontFamily: "Open Sans, sans-serif",
        fontSize: "2rem",
        p: {
            color: "gray",
            fontSize: "1rem",
            fontWeight: "smaller"
        }
    };

    return (
        <div style={styles}>
            <h1>Documents de santé</h1>
            <p>
                Retrouvez ici vos documents partagés.
            </p>
            <div>
                {/* {patient.documents.map((document) => (
                    <Card key={document.id} document={document} />
                ))} */}
            </div>
        </div>
    );
};

export default DocumentsPage;
