const RelationshipRepository = require("../repositories/RelationshipRepository");
const PersonRepository = require("../repositories/PersonRepository");
const PersonService = require("../services/PersonService");

const relationshipRepository = new RelationshipRepository();
const personRepository = new PersonRepository();
const personService = new PersonService();

class RecommendationsService {

  async fillList(cpfIn, list) {
    if (list.length === 0 || (list.length > 0 && list.find(item => item.cpf === cpfIn) === undefined)) {
      list.push({ cpf: cpfIn, count: 0 });
    }
  }

  async findRelationships(cpf, list) {
    var relationships = [];
    var count = 0;

    relationships = await relationshipRepository.filter({ cpf1: cpf });
    relationships.map((relationship => this.fillList(relationship.cpf2, list)));

    relationships = await relationshipRepository.filter({ cpf2: cpf });
    relationships.map((relationship => this.fillList(relationship.cpf1, list)));

    list.map(async item => {
      count += await relationshipRepository.count({ cpf1: item.cpf });
      count += await relationshipRepository.count({ cpf2: item.cpf });

      item.count = count;
    })
  }

  async get(cpf) {
    var firstFriends = [];
    var recommendationsTotal = [];
    var recommendations = [];

    if (!personService.validateCPF(cpf)) {
      return new Promise((_, reject) => {
        reject({ status: 400, message: "Invalid CPF." });
      })
    }

    const person = await personRepository.find({ cpf: cpf });

    if (person === undefined || person === null) {
      return new Promise((_, reject) => {
        reject({ status: 404, message: "Person not exists." });
      })
    }

    await this.findRelationships(cpf, firstFriends);

    for (let index = 0; index < firstFriends.length; index++) {
      await this.findRelationships(firstFriends[index].cpf, recommendationsTotal);
    }

    recommendationsTotal = recommendationsTotal.filter(recommendation => !(cpf === recommendation.cpf));
    recommendationsTotal = recommendationsTotal.filter(recommendation => !firstFriends.find(item => item.cpf === recommendation.cpf));

    recommendations = recommendationsTotal.sort(function (a, b) {
      if (a.count > b.count) return -1;
      if (a.count < b.count) return 1;
      return 0;
    });

    recommendations = recommendations.map(recommendation => recommendation.cpf);

    return new Promise((resolve, _) => resolve(recommendations));
  }
}

module.exports = RecommendationsService;