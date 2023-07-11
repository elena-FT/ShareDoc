export class Document {
    static lastId = 0;

    constructor(name, path, dateAdded, type, format, content) {
      this.id = ++Document.lastId;
      this.name = name;
      this.path = path;
      this.dateAdded = dateAdded;
      this.type = type;
      this.format = format;
      this.content = content;
      this.read = [];
      this.edit = [];
    }
  }  