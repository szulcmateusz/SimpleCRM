const {readFile, writeFile} = require('fs').promises;
const {join} = require('path');
const {v4: uuid} = require('uuid');
const {ClientRecord} = require("../records/client-record");

class Db {
    constructor(dbFileName) {
        this.dbFileName = join(__dirname, `../data/`, dbFileName);
        this._load(this.dbFileName);
    }

    async _load() {
        this._data = JSON.parse(await readFile(this.dbFileName, 'utf8')).map(obj => new ClientRecord(obj));
    }

    _save() {
        writeFile(this.dbFileName, JSON.stringify(this._data), 'utf8');
    }

    create(obj) {
        const id = uuid();
        this._data.push(new ClientRecord({
            id,
            ...obj,
        }));
        this._save();
        return id;
    }

    getAll() {
        return this._data;
    }

    getOne(id) {
        return this._data.find(oneObj => oneObj.id === id);
    }

    update(id, newObject) {
        this._data = this._data.map(oneObject => {
            if (oneObject.id === id) {
                return {
                    ...oneObject,
                    ...newObject,
                };
            } else {
                return oneObject;
            }
        });
        writeFile(this.dbFileName, JSON.stringify(this._data), 'utf8');
    }
    delete(id) {
        this._data = this._data.filter(oneEl => oneEl.id !== id);
        this._save();
    }
}

const db = new Db('client.json');

module.exports = {
    db,
};