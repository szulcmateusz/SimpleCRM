const {ValidationError} = require("../utils/errors");

class ClientRecord {
    constructor(obj) {
        const {id, name, mail, nextContactAt, notes} = obj;

        if (!id || typeof id !== 'string') {
            throw new ValidationError('ID musi być niepustym tekstem.');
        }

        if (!name || typeof name !== 'string' || name.length < 3) {
            throw new ValidationError('Imię musi być tekstem o długości minimum 3 znaków.');
        }

        if (!mail || typeof mail !== 'string' || mail.indexOf('@') === -1) {
            throw new ValidationError('E-mail nieprawidłowy.');
        }

        if (typeof nextContactAt !== 'string') {
            throw new ValidationError('Data następnego kontaktu musi być tekstem.');
        }

        if (typeof notes !== 'string') {
            throw new ValidationError('Notatki muszą być tekstem.');
        }

        this.id = id;
        this.name = name;
        this.mail = mail;
        this.nextContactAt = nextContactAt;
        this.notes = notes;
    }
}

module.exports = {
    ClientRecord,
};