var express = require('express');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
var exphbs = require("express-handlebars");

// Sets up our express server
var app = express();

// Set up a port number and process.env is for Heroku deployment
var PORT = process.env.PORT || 3306;

// Body-parser code 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// handlebars setup
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Override with POST having ?_method=DELETE
app.use(methodOverride("_method"));

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("./public"));

// Requiring our models for syncing
var db = require("./models");

// Import routes and give the server access to them.
require("./controllers/burgers_controller.js")(app);

// Syncing our sequelize models and then starting our express app
db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});

