const BaseService = require("./BaseService");
const Repository = require("../repositories/PersonRepository");

class PersonService extends BaseService {
  constructor() {
    super(new Repository());
  }


  validateCPF(cpf) {
    return !(cpf.length > 11)
  };

  async create(newPerson) {
    const person = await this._repository.find({ cpf: newPerson.cpf });

    return new Promise((resolve, reject) => {
      if (!this.validateCPF(newPerson.cpf)) {
        reject("Invalid CPF.");
        return;
      }

      if (person !== undefined) {
        reject("Person exists.");
        return;
      }

      newPerson = {
        ...newPerson,
        createdAt: new Date().toLocaleDateString(),
        updatedAt: new Date().toLocaleDateString()
      };

      this._repository.insert(newPerson)
        .then(person => {
          if (person !== undefined) {
            resolve(person);
          }
          else {
            reject("Person not created.");
          }
        })
        .catch(error => reject(new Error(error)))
    })
  };

  async get(cpf) {
    return new Promise((resolve, reject) => {
      this._repository.find({ cpf: cpf })
        .then(person => {
          if (person !== undefined) {
            resolve(person);
          }
          else {
            reject("Person not exists.");
          }
        })
        .catch(error => reject(new Error(error)))
    })
  };

  async getAll() {
    return new Promise((resolve, reject) => {
      this._repository.getAll()
        .then(persons => {
          if (persons !== undefined) {
            resolve(persons);
          }
          else {
            reject("Persons empty.");
          }
        })
        .catch(error => reject(new Error(error)))
    });
  }
}

module.exports = PersonService;