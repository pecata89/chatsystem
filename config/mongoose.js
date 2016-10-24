var config = require("./config");
var mongoose = require("mongoose");

module.exports = function () {
    mongoose.Promise = global.Promise;
    var db = mongoose.connect(config.db, function (err) {
        if (!err) {
            console.log("Connected to mongodb.");
        } else {
            console.log("MongoDB is not running: ", err);
        }
    });

    // REGISTERING MODELS
    require("../app/models/user.server.model");
    require("../app/models/room.server.model");
    require("../app/models/message.server.model");

    return db;
};