import User from '../class/user.js';

export class UserBuilder {
    static buildUser(firstName, lastName, dateOfBirth, id, mail, password, isDoctor = false) {
        const user = new User(firstName, lastName, dateOfBirth, id, mail, password, isDoctor)
        return user;
    }
}
