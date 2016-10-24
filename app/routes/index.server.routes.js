var users = require('../../app/controllers/users.server.controller'),
    index = require("../../app/controllers/index.server.controller"),
    rooms = require("../../app/controllers/rooms.server.controller"),
    messages = require("../../app/controllers/messages.server.controller"),
    passport = require('passport');
//var expressPath = require('express-path');

module.exports = function(app) {
    // if (app.locals.room) {
    //     app.route("/")
    //         .all(messages.list);
    // }
    app.route("/")
        .all(users.list, rooms.list, messages.list)
        .all(function (req, res, next) {
            //
            // console.log(req.session.rooms);
            // console.log(req.session.roomsCount);
            //
            // if (!req.session.room && req.session.rooms) {
            //     req.session.room = req.session.rooms[0];
            // }
            // else if (req.session.roomsCount == 0) {
            //     req.session.room = "";
            // }
            //console.log(Object.keys(req.session.rooms).length);
            if (!req.session.room && req.session.rooms) {
                req.session.room = req.session.rooms[0];
            }
            else if (req.session.roomsCount == 0) {
                req.session.room = "";
            }
            // else {
            //     // AT SOME POINT RUNNING THROUGH ALL THE ROOMS WILL ALWAYS BE EQUAL OR NOT EQUAL TO ROOM ID
            //     // AT SOME POINT RUNNING THROUGH ALL THE ROOMS WILL ALWAYS BE EQUAL OR NOT EQUAL TO ROOM ID
            //     // AT SOME POINT RUNNING THROUGH ALL THE ROOMS WILL ALWAYS BE EQUAL OR NOT EQUAL TO ROOM ID
            //
            //     for (var i = 0; i < Object.keys(req.session.rooms).length; i++) {
            //         if (String(req.session.rooms[i]._id) !== String(req.session.room._id)) {
            //             req.session.room = req.session.rooms[0];
            //         }
            //     }
            // }

            next();
        })
        .get(index.render)
        .post(passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/',
            failureFlash: true
        }));

    //var routes = [
    //    // Route mapping here
    //];

    //expressPath(app, routes, { "controllersPath" : "../controllers", "middlewaresPath" : "../middlewares" });
};