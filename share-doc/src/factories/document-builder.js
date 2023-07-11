import Document from '../class/document.js';

export class DocumentBuilder {
    static buildDocument(name, path, dateAdded, type, format, content){
        const document = new Document(name, path, dateAdded, type, format, content)
        return document;
    }
}
