import Document from '../class/document.js';

export class DocumentBuilder {
    static buildDocument(name, path, dateAdded, id, type){
        const document = new Document(name, path, dateAdded, id, type)
        return document;
    }
}
