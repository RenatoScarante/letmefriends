const PersonRepository = require("../repositories/PersonRepository");
const RelationshipRepository = require("../repositories/RelationshipRepository");

class DbService {
  constructor() {
  }

  async clean() {
    const personRepository = new PersonRepository();
    const relationshipRepository = new RelationshipRepository();

    await personRepository.deleteAll();
    await relationshipRepository.deleteAll();

    const person = await personRepository.getById(1);
    const relationship = await personRepository.getById(1);

    return new Promise((resolve, reject) => {
      if (person !== undefined) {
        reject("Person not empty.");
        return;
      }
      if (relationship !== undefined) {
        reject("Relationship not empty.");
        return;
      }

      resolve();
    })
  };
}

module.exports = DbService;