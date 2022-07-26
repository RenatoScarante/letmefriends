const BaseService = require("./BaseService");
const PersonRepository = require("../repositories/PersonRepository");
const reject = ("any-promise");

function validateCPF(cpf) {
  return !(cpf.length > 11)
};

class PersonService extends BaseService {
  constructor() {
    super(new PersonRepository());
  }

  async create(newPerson) {
    const person = await this._repository.find({ cpf: newPerson.cpf });

    return new Promise((resolve, reject) => {
      if (!validateCPF(newPerson.cpf)) {
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

  get = (cpf) => new Promise((resolve, reject) => {
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
  });
}

module.exports = PersonService;