const RelationshipService = require("../services/RelationshipService");
const PersonService = require("../services/PersonService");

const personList = [
  { cpf: "11111111111", name: "Test 1" },
  { cpf: "22222222222", name: "Test 2" },
  { cpf: "33333333333", name: "Test 3" },
  { cpf: "44444444444", name: "Test 4" },
  { cpf: "55555555555", name: "Test 5" },
  { cpf: "66666666666", name: "Test 6" },
  { cpf: "77777777777", name: "Test 7" },
  { cpf: "88888888888", name: "Test 8" },
  { cpf: "99999999999", name: "Test 9" },
  { cpf: "12345678912", name: "Test 10" }
];

const relationshipList = [
  { cpf1: "11111111111", cpf2: "22222222222" },
  { cpf1: "22222222222", cpf2: "33333333333" },
  { cpf1: "33333333333", cpf2: "44444444444" },
  { cpf1: "44444444444", cpf2: "55555555555" },
  { cpf1: "44444444444", cpf2: "66666666666" },
  { cpf1: "55555555555", cpf2: "66666666666" },
  { cpf1: "66666666666", cpf2: "77777777777" },
  { cpf1: "22222222222", cpf2: "77777777777" },
  { cpf1: "55555555555", cpf2: "77777777777" },
  { cpf1: "77777777777", cpf2: "88888888888" },
  { cpf1: "77777777777", cpf2: "99999999999" },
  { cpf1: "44444444444", cpf2: "77777777777" },
  { cpf1: "77777777777", cpf2: "12345678912" }
];

class TestService {
  constructor() {
  }

  async createPersons() {
    const personService = new PersonService();

    personList.map(person =>
      personService.create(person)
    );

    return new Promise((resolve, reject) => {
      resolve(personList);
    });
  }

  async createRelationships() {
    const relationshipService = new RelationshipService();

    await relationshipList.map(relationship => {
      relationshipService.create(relationship);
    });

    return new Promise((resolve, reject) => {
      resolve(relationshipList);
    });
  }

  async delete() {
    await personList.map(person => {
      personService.delete(person);
    });

    await relationshipList.map(relationship => {
      relationshipService.delete(relationship);
    });

    return new Promise((resolve, reject) => {
      resolve();
    });
  }
}

module.exports = TestService;