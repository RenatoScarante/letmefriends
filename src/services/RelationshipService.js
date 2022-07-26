const BaseService = require("./BaseService");
const RelationshipRepository = require("../repositories/RelationshipRepository");
const PersonRepository = require("../repositories/PersonRepository");
const reject = ("any-promise");

const personRepository = new PersonRepository();

class RelationshipService extends BaseService {
  constructor() {
    super(new RelationshipRepository());
  }

  async create(newRelationship) {
    var { cpf1, cpf2 } = newRelationship;

    const personCpf1 = await personRepository.find({ cpf: cpf1 });
    const personCpf2 = await personRepository.find({ cpf: cpf2 });
    const relationship = await this._repository.find({ cpf1: cpf1 } && { cpf2: cpf2 });

    return new Promise((resolve, reject) => {
      if (personCpf1 === undefined) {
        reject(`Person CPF ${cpf1} not exists.`);
        return;
      }

      if (personCpf2 === undefined) {
        reject(`Person CPF ${cpf2} not exists.`);
        return;
      }

      if (relationship !== undefined) {
        resolve(relationship);
        return;
      }

      newRelationship = {
        ...newRelationship,
        createdAt: new Date().toLocaleDateString(),
        updatedAt: new Date().toLocaleDateString()
      };

      this._repository.insert(newRelationship)
        .then(relationship => {
          if (relationship !== undefined) {
            resolve(relationship);
          }
          else {
            reject("Relationship not created.");
          }
        })
        .catch(error => reject(new Error(error)))
    });
  }

  get = (relationship) => {
    var { cpf1, cpf2 } = relationship;

    return new Promise((resolve, reject) => {
      this._repository.find({ cpf1: cpf1 } && { cpf2: cpf2 })
        .then(relationship => {
          if (relationship !== undefined) {
            resolve(relationship);
          }
          else {
            reject("Relationship not exists.");
          }
        })
        .catch(error => reject(new Error(error)))
    });
  }

  async delete(relationship) {
    var { cpf1, cpf2 } = relationship;

    relationship = await this._repository.find({ cpf1: cpf1 } && { cpf2: cpf2 });

    return new Promise((resolve, reject) => {
      if (relationship === undefined) {
        reject("Relationship not exists.");
        return;
      }

      this._repository.delete({ cpf1: cpf1 } && { cpf2: cpf2 })
        .then(() => {
          resolve(relationship);
        })
        .catch(error => reject(new Error(error)))
    });
  }
}

module.exports = RelationshipService;