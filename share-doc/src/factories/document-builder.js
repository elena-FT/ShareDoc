import Document from '../class/document.js';

export class DocumentBuilder {
    static buildDocument(name, dateAdded, id, type, addedBy){
        const document = new Document(name, dateAdded, id, type, addedBy)
        return document;
    }
}
