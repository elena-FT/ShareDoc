export class Document {
    constructor(name, dateAdded, id, type, addedBy) {
      this.id = id;
      this.name = name;
      this.dateAdded = dateAdded;
      this.type = type;
      this.addedBy = addedBy;
      this.read = [addedBy.id];
      this.edit = [addedBy.id];
    }
  }  