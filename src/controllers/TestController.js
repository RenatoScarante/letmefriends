const BaseController = require("./BaseController")
const Service = require("../services/TestService");

class TestController extends BaseController {
  constructor() {
    super(new Service());
  }

  init = async () => {
    await this._service.createPersons();
    await this._service.createRelationships();

    console.log('Test created successfully');
  }

  post = (req, res) => {
    try {
      this._service
        .createPersons()
        .then(() => {
          this._service
            .createRelationships()
            .then(() => {
              this.success(res, "Test created successfully");
            })
            .catch(message => {
              this.error404(res, message);
            });
        })
        .catch(message => {
          this.error404(res, message);
        });
    } catch (error) {
      this.error500(res, `Error to create a new test, ${error.message}`);
    }
  };

  delete = (req, res) => {
    try {
      this._service
        .delete()
        .then(() => {
          this.success(res, "Test deleted successfully");
        })
        .catch(message => {
          this.error404(res, message);
        });
    } catch (error) {
      this.error500(res, `Error to delete a tests, ${error.message}`);
    }
  };
}

module.exports = TestController;