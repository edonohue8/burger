var express = require("express");

var router = express.Router();

// Importing the model to use its database functions
var burger = require("../models/burger.js");

// Creating all routes and setting up logic within those routes where required
// Setting up get route to index
router.get("/", function (req, res) {
    res.redirect("/burgers");
});

router.get("/burgers", function (req, res) {
    // Setting up express callback response by calling burger.selectAllBurger
    burger.all(function (burgerData) {
        // Setting up wrapper for orm.js where using MySQL query callback will return burger_data and render to index with handlebar
        res.render("index", {
            burger_data: burgerData
        });
    });
});

// Setting up post route for getting back to index
router.post("/burgers/create", function (req, res) {
    // Taking the request object using it as input for burger.addBurger
    burger.create(req.body.burger_name, function (result) {
        // Setting up wrapper for orm.js where using MySQL insert callback will return a log to the console and render back to index with handlebar
        console.log(result);
        res.redirect("/");
    });
});

// Setting up put route for getting back to index
router.put("/burgers/:id", function (req, res) {
    burger.update(req.params.id, function (result) {
        // Setting up wrapper for orm.js where using MySQL update callback will return a log to the console and render back to index with handlebar
        console.log(result);
        // Sending back response and letting page reload from .then in Ajax
        res.sendStatus(200);
    });
});

// Exporting routes for server.js to use
module.exports = router;