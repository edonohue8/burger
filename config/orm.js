// Importing MySQL connection
var connection = require("./connection.js");

// Setting up helper function for SQL syntax
function printQuestionMarks(num) {
    var arr = [];

    for (var i = 0; i < num; i++) {
        arr.push("?");
    }

    return arr.toString();
}

// Setting up helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
    // Setting up each column with values (e.g. column1=value, column2=value2, etc.)
    var arr = [];

    // Looping through the keys and pushing the key/value as a string int arr
    for (var key in ob) {
        arr.push(key + "=" + ob[key]);
    }

    // Translating array of strings to a single comma-separated string
    return arr.toString();
}

// Setting up object for all SQL statement functions
var orm = {
    all: function (tableInput, cb) {
        var queryString = "SELECT * FROM " + tableInput + ";";
        connection.query(queryString, function (err, result) {
            if (err) {
                throw err;
            }
            cb(result);
        });
    },
    // Fyi for below - vals is an array of values that we want to save to cols
    // Fyi for below - cols are the columns we want to insert the values into
    create: function (table, cols, vals, cb) {
        var queryString = "INSERT INTO " + table;

        queryString += " (";
        queryString += cols.toString();
        queryString += ") ";
        queryString += "VALUES (";
        queryString += printQuestionMarks(vals.length);
        queryString += ") ";

        console.log(queryString);

        connection.query(queryString, vals, function (err, result) {
            if (err) {
                throw err;
            }
            cb(result);
        });
    },
    // Fyi for below - objColVals would be the columns and values you want to update
    update: function (table, objColVals, condition, cb) {
        var queryString = "UPDATE " + table;

        queryString += " SET ";
        queryString += objToSql(objColVals);
        queryString += " WHERE ";
        queryString += condition;

        console.log(queryString);
        connection.query(queryString, function (err, result) {
            if (err) {
                throw err;
            }
            cb(result);
        });
    }
};

// Exporting the orm object
module.exports = orm;