const BaseRepository = require("./BaseRepository");
const table = process.env.DB_TABLE_PERSON;

class PersonRepository extends BaseRepository {
  constructor() {
    super(table);
  }
}

module.exports = PersonRepository;