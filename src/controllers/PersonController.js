const BaseController = require("./BaseController")
const Service = require("../services/PersonService");

class PersonController extends BaseController {
  constructor() {
    super(new Service());
  }

  post = (req, res) => {
    var newPerson = req.body;

    try {
      this._service
        .create(newPerson)
        .then(person => {
          this.success(res, "Person created successfully");
        })
        .catch(message => {
          this.error404(res, message);
        });
    } catch (error) {
      this.error500(res, `Error to create a new person, ${error.message}`);
    }
  };

  get = (req, res) => {
    const cpf = req.params.cpf;

    try {
      this._service
        .get(cpf)
        .then(person => {
          this.success(res, { person });
        })
        .catch(message => {
          this.error400(res, message);
        });
    } catch (error) {
      this.error500(res, `Error to get a person, ${error.message}`);
    }
  };

  getAll = (req, res) => {
    try {
      this._service
        .getAll()
        .then(persons => {
          this.success(res, persons);
        })
        .catch(message => {
          this.error400(res, message);
        });
    } catch (error) {
      this.error500(res, `Error to get a person, ${error.message}`);
    }
  };
}

module.exports = PersonController;