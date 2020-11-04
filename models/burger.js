// Importing the ORM to create functions that will interact with the database
var orm = require("../config/orm.js");

var burger = {
    all: function (cb) {
        orm.all("burgers", function (res) {
            cb(res);
        });
    },
    // Fyi for below - the variable name is array
    create: function (name, cb) {
        orm.create("burgers", [
            "burger_name", "devoured"
        ], [
            name, false
        ], cb);
    },
    update: function (id, cb) {
        var condition = "id=" + id;
        orm.update("burgers", {
            devoured: true
        }, condition, cb);
    }
};

// Exporting the database functions for the controller
module.exports = burger;