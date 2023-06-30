export class Document {
    constructor(name, path, dateAdded, id, type) {
      this.id = id;
      this.name = name;
      this.path = path;
      this.dateAdded = dateAdded;
      this.type = type;
      this.read = [];
      this.edit = [];
      this.folderName = path.split('/')[0];
    }
  }  