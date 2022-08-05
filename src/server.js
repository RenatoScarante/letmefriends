require("dotenv").config();

const express = require("express");
const jsonServer = require("json-server");
const bodyParser = require("body-parser");

const PersonController = require("./controllers/PersonController");
const RelationshipController = require("./controllers/RelationshipController");
const RecommendationsController = require("./controllers/RecommendationsController");
const DbController = require("./controllers/DbController");
const TestController = require("./controllers/TestController");

const app = express();
const port = process.env.PORT ? process.env.PORT : 5000;

const personController = new PersonController();
const relationshipController = new RelationshipController();
const recommendationsController = new RecommendationsController();
const dbController = new DbController();
const testController = new TestController();

app.use(jsonServer.defaults());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// /test
//if (process.env.ENVIRONMENT === "DEV") {
//  testController.init();
//}

app.route(process.env.ROUTE_TESTS).post(testController.post);
app.route(process.env.ROUTE_TESTS).delete(testController.delete);

// /person
app.route(process.env.ROUTE_PERSON_POST).post(personController.post);
app.route(process.env.ROUTE_PERSON_GET).get(personController.get);
app.route(process.env.ROUTE_PERSON_GET_ALL).get(personController.getAll);

// /relationship
app.route(process.env.ROUTE_RELATIONSHIP_POST).post(relationshipController.post);
app.route(process.env.ROUTE_RELATIONSHIP_GET).get(relationshipController.get);
app.route(process.env.ROUTE_RELATIONSHIP_GET_ALL).get(relationshipController.getAll);

// /clean
app.route(process.env.ROUTE_CLEAN).delete(dbController.clean);

// /recommendations
app.route(process.env.ROUTE_RECOMMENDATIONS).get(recommendationsController.get);

app.listen(port, () => console.log(`LetMeFriends Server is running on port ${port}`));
