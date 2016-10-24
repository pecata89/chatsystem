
// THIS IS WHERE WE ADD EVERYTHING RELATED TO THE EXPRESS CONFIGURATION
// THIS APPLICATION IS BUILD WITH CommonJS MODULE PATTERN

var config = require("./config");
var http = require("http");
var socketio = require("socket.io");
var express = require("express");
var morgan = require("morgan");
var compress = require("compression");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var session = require("express-session");
var MongoStore = require("connect-mongo")(session);
var flash = require("connect-flash");
var passport = require("passport");


// CommonJS MODULE PATTERN TO DEFINE A MODULE FUNCTION
module.exports = function (db) {
    var app = express();
    var server = http.createServer(app);
    var io = socketio.listen(server);

    if (process.env.NODE_ENV === "development") {
        app.use(morgan("dev"));
    } else if (process.env.NODE_ENV === "production") {
        app.use(compress());
    }

    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json({
        strict: true
    }));
    app.use(methodOverride());

    var mongoStore = new MongoStore({
        mongooseConnection: db.connection
    });

    app.use(session({
        saveUninitialized: true,
        resave: true,
        secret: config.sessionSecret,
        store: mongoStore
    }));

    // WE USE APP.SET() METHOD TO CONFIGURE THE EXPRESS APPLICATION
    // VIEWS FOLDER AND TEMPLATE ENGINE
    app.set("views", "./app/views");
    app.set("view engine", "pug");
    // app.set("view options", {layout: false});

    app.use(flash());
    app.use(passport.initialize());
    app.use(passport.session());

    //require("../app/middlewares/links.server.middleware")(app);
    //no middleware like this, loads too many times
    //middleware for router is a conditional statement
    //require("../app/middlewares/rooms.server.middleware")(app);
    require("../app/middlewares/users.server.middleware")(app);

    require("../app/routes/index.server.routes")(app);
    require("../app/routes/users.server.routes")(app);
    require("../app/routes/rooms.server.routers")(app);
    // require("../app/routes/messages.server.routes")(app);

    // express.static() MIDDLEWARE
    app.use(express.static("public"));

    require("./socketio")(server, io, mongoStore);

    return server;
};