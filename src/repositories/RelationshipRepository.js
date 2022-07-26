const BaseRepository = require("./BaseRepository");
const table = process.env.DB_TABLE_RELATIONSHIP;

class RelationshipRepository extends BaseRepository {
  constructor() {
    super(table);
  }
}

module.exports = RelationshipRepository;