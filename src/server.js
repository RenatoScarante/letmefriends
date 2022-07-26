require("dotenv").config();

const PersonController = require("./controllers/PersonController");
const RelationshipController = require("./controllers/RelationshipController");
const TestController = require("./controllers/TestController");

const jsonServer = require("json-server");
const bodyParser = require("body-parser");

const express = require("express");
const app = express();

const routerDb = jsonServer.router(require("./db/db.js")());
const db = routerDb.db;
const port = process.env.PORT ? process.env.PORT : 5000;

const personTable = "person";
const relationshipTable = "relationship";

function createTest() {
  for (let index = 1; index <= 10; index++) {
    const newPerson = { cpf: index, name: `Person ${index}` }

    db.get(personTable)
      .insert(newPerson)
      .value();
  }
}

app.use(jsonServer.defaults());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

function getPerson(cpf) {
  return db
    .get(personTable)
    .find({ cpf: cpf })
    .value();
}

function responseError(res, status, message) {
  res.status(status).json(message);
}

function responseSuccess(res, message) {
  res.status(200).json(message);
}

const personController = new PersonController();
const relationshipController = new RelationshipController();
const testController = new TestController();

// /test
app.route(process.env.ROUTE_TESTS).post(testController.post);
app.route(process.env.ROUTE_TESTS).delete(testController.delete);

// /person
app.route(process.env.ROUTE_PERSON_POST).post(personController.post);
app.route(process.env.ROUTE_PERSON_GET).get(personController.get);

// /relationship
app.route(process.env.ROUTE_RELATIONSHIP_POST).post(relationshipController.post);
app.route(process.env.ROUTE_RELATIONSHIP_GET).get(relationshipController.get);

// DELETE /clean
app.delete(process.env.ROUTE_CLEAN, (req, res) => {

  db.data = {};
  db.write();

  db.defaults({
    personTable: [],
    relationshipTable: []
  }).write()

  responseSuccess(res, "Clean success.");
});

// GET /recommendations/:cpf
app.get(process.env.ROUTE_RECOMMENDATIONS, (req, res) => {
  var cpf = req.params.cpf;

  if (cpf.length > 11) {
    responseError(400, `CPF ${cpf} number invalid.`);
    return;
  }

  var person = getPerson(cpf);

  if (person === undefined) {
    responseError(res, 404, `Person ${cpf} not exists.`);
    return;
  }

  var relationship = db
    .get(relationshipTable)
    .find({ cpf1: cpf } || { cpf2: cpf })
    .value();

  if (relationship === undefined) {
    responseError(res, 404, `Person ${cpf} not exists.`);
    return;
  }

  responseSuccess(res, relationship);
});

//server.use("/api", router);

app.listen(port, () => {
  console.log(`LetMeFriends Server is running on port ${port}`);
});
