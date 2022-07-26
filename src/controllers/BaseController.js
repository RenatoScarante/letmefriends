
class BaseController {
  constructor(mainService) {
    this._service = mainService;
  }

  success = (res, message) => res.status(200).json(message);
  error = (res, status, message) => res.status(status).json(message);
  error400 = (res, message) => error(res, 400, message);
  error404 = (res, message) => error(res, 404, message);
  error500 = (res, message) => error(res, 500, message);
}

module.exports = BaseController;