const BaseController = require("./BaseController");
const Service = require("../services/RecommendationsService");

class RecommendationsController extends BaseController {
  constructor() {
    super(new Service());
  }

  get = (req, res) => {
    const cpf = req.params.cpf;

    try {
      this._service
        .get(cpf)
        .then(recommendations => {
          this.success(res, recommendations);
        })
        .catch(error => {
          this.error(res, error.status, error.message);
        });
    } catch (error) {
      this.error500(res, `Error to get a recommendations, ${error.message}`);
    }
  };
}

module.exports = RecommendationsController;