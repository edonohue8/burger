var express = require("express");

var PORT = process.env.PORT || 8080;

var app = express();

// Serving static content for the app from the "public" directory in the application directory
app.use(express.static("public"));

// Parsing application body as JSON
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

// Setting handlebars
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({
    defaultLayout: "main"
}));
app.set("view engine", "handlebars");

// Importing routes and giving server access to them
var routes = require("./controllers/burgers_controller.js");

app.use(routes);

// Starting server so it can begin listening to client requests
app.listen(PORT, function () {
    console.log("Listening on port: ", PORT);
});