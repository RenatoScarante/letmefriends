const BaseService = require("./BaseService");
const Repository = require("../repositories/RelationshipRepository");
const PersonRepository = require("../repositories/PersonRepository");

const personRepository = new PersonRepository();

class RelationshipService extends BaseService {
  constructor() {
    super(new Repository());
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

  async get(relationship) {
    var { cpf1, cpf2 } = relationship;

    return new Promise((resolve, reject) => {
      this._repository.filter({ cpf1: cpf1 })
        .then(relationships => {
          if (relationships === undefined || relationships.length === 0) {
            reject("Relationship not exists.");
          }
          else {
            if (relationships.length === 1) {
              relationship = relationships[0];
            }
            else {
              relationship = relationships.find(relationship => relationship.cpf2 === cpf2);
            }

            if (relationship.cpf2 === cpf2) {
              resolve(relationship);
            }
            else {
              reject("Relationship not exists.");
            }
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
  };

  async getAll() {
    return new Promise((resolve, reject) => {
      this._repository.getAll()
        .then(relationships => {
          if (relationships !== undefined) {
            resolve(relationships);
          }
          else {
            reject("Relationships empty.");
          }
        })
        .catch(error => reject(new Error(error)))
    })
  };

  async filter(filter) {
    return new Promise((resolve, reject) => {
      this._repository.filter(filter)
        .then(relationships => {
          resolve(relationships);
        })
        .catch(error => reject(new Error(error)))
    });
  }
}

module.exports = RelationshipService;