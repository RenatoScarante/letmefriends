const BaseController = require("./BaseController")
const Service = require("../services/DbService");

class DbController extends BaseController {
  constructor() {
    super(new Service());
  }

  clean = (req, res) => {
    try {
      this._service
        .clean()
        .then(() => {
          this.success(res, "Clean successfully");
        })
        .catch(message => {
          this.error404(res, message);
        });
    } catch (error) {
      this.error500(res, `Error to create a new person, ${error.message}`);
    }
  };
}

module.exports = DbController;