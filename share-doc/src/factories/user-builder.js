import User from '../class/user.js';

export class UserBuilder {
    static buildUser(firstName, lastName, dateOfBirth, mail,callNumber, password, isDoctor = false) {
        const user = new User(firstName, lastName, dateOfBirth, mail, callNumber, password, isDoctor)
        return user;
    }
}
