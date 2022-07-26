const jsonServer = require("json-server");
const router = jsonServer.router(require("../db/db.js")());
const db = router.db;

class BaseRepository {
  constructor(table) {
    this._table = table;
  }

  getById = async id => new Promise((resolve, reject) => {
    try {
      const item = db.get(this._table)
        .getById(id)
        .value();

      resolve(item);
    }
    catch (err) {
      reject(err);
    }
  });

  find = filter => {
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

  insert = data => new Promise((resolve, reject) => {
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
  });

  update = async data => new Promise((resolve, reject) => {
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
  });

  delete = async filter => new Promise((resolve, reject) => {
    try {
      db.get(this._table)
        .remove(filter)
        .write();

      resolve();
    }
    catch (err) {
      reject(err);
    }
  });

  filter = async (filter, sortBy = "") => new Promise((resolve, reject) => {
    try {
      resolve(db.get(this._table)
        .filter(filter)
        .sortBy(sortBy)
        .value());
    }
    catch (err) {
      reject(err);
    }
  });
}

module.exports = BaseRepository;
