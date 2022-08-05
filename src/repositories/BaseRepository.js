const jsonServer = require("json-server");
const router = jsonServer.router(require("../db/db.js")());
const db = router.db;

class BaseRepository {
  constructor(table) {
    this._table = table;
  }

  getById = async id => {
    return new Promise((resolve, reject) => {
      try {
        const item = db.get(this._table)
          .getById(id)
          .value();

        resolve(item);
      }
      catch (err) {
        reject(err);
      }
    })
  };

  getAll = async () => {
    return new Promise((resolve, reject) => {
      try {
        const items = db.get(this._table)
          .value();

        resolve(items);
      }
      catch (err) {
        reject(err);
      }
    })
  };

  find = async filter => {
    return new Promise((resolve, reject) => {
      try {
        const item = db.get(this._table)
          .find(filter)
          .value();

        resolve(item);
      }
      catch (err) {
        reject(err);
      }
    })
  };

  insert = async data => {
    return new Promise((resolve, reject) => {
      try {
        const item = db.get(this._table)
          .insert(data)
          .value();

        db.write();

        resolve(item);
      }
      catch (err) {
        reject(err);
      }
    })
  };

  update = async data => {
    return new Promise((resolve, reject) => {
      try {
        const item = db.get(this._table)
          .getById(data.id)
          .assign(data)
          .write();

        resolve(item);
      }
      catch (err) {
        reject(err);
      }
    })
  };

  delete = async filter => {
    return new Promise((resolve, reject) => {
      try {
        db.get(this._table)
          .remove(filter)
          .write();

        resolve();
      }
      catch (err) {
        reject(err);
      }
    })
  };

  deleteAll = async () => {
    return new Promise((resolve, reject) => {
      try {
        db.get(this._table)
          .remove({})
          .write();

        resolve();
      }
      catch (err) {
        reject(err);
      }
    })
  };

  filter = async (filter, sortBy = "") => {
    return new Promise((resolve, reject) => {
      try {
        const items = db.get(this._table)
          .filter(filter)
          .sortBy(sortBy)
          .value();

        resolve(items);
      }
      catch (err) {
        reject(err);
      }
    })
  };

  count = async (filter) => {
    return new Promise((resolve, reject) => {
      try {
        const items = db.get(this._table)
          .filter(filter)
          .value();

        resolve(items.length);
      }
      catch (err) {
        reject(err);
      }
    })
  };
}

module.exports = BaseRepository;
