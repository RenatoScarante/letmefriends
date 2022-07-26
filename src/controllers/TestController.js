const BaseController = require("./BaseController")
const TestService = require("../services/TestService");

class TestController extends BaseController {
  constructor() {
    super(new TestService());
  }

  async post(req, res) {
    console.log(req)
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

  async delete(req, res) {
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