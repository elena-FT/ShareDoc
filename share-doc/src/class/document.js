export class Document {
    constructor(name, path, dateAdded, id, type, format) {
      this.id = id;
      this.name = name;
      this.path = path;
      this.dateAdded = dateAdded;
      this.type = type;
      this.format = format;
      this.read = [];
      this.edit = [];
    }
  }  