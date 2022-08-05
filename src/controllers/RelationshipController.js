const BaseController = require("./BaseController")
const Service = require("../services/RelationshipService");

class RelationshipController extends BaseController {
  constructor() {
    super(new Service());
  }

  post = (req, res) => {
    var newRelationship = req.body;

    try {
      this._service
        .create(newRelationship)
        .then(relationship => {
          this.success(res, "Relationship created successfully");
        })
        .catch(message => {
          this.error404(res, message);
        });
    } catch (error) {
      this.error500(res, `Error to create a new relationship, ${error.message}`);
    }
  };

  get = (req, res) => {
    var relationship = req.body;

    try {
      this._service
        .get(relationship)
        .then(relationship => {
          this.success(res, { relationship });
        })
        .catch(message => {
          this.error400(res, message);
        });
    } catch (error) {
      this.error500(res, `Error to get a relationship, ${error.message}`);
    }
  };

  getAll = (req, res) => {
    try {
      this._service
        .getAll()
        .then(relationships => {
          this.success(res, relationships);
        })
        .catch(message => {
          this.error400(res, message);
        });
    } catch (error) {
      this.error500(res, `Error to get a relationship, ${error.message}`);
    }
  };
}

module.exports = RelationshipController;