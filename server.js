process.env.NODE_ENV = process.env.NODE_ENV || "development";

var mongoose = require("./config/mongoose");
var express = require(`./config/express`);
var passport = require("./config/passport");

var db = mongoose();
var app = express(db);
var passport = passport();
var port = 8000;

// METHOD TO MOUNT A MIDDLE WARE FUNCTION

app.listen(port, function () {
    console.log("Server running at http://localhost:" + port + "/");
    console.log("Environment: " + process.env.NODE_ENV);
});

module.exports = app;