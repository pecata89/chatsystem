var rooms = require("../../app/controllers/rooms.server.controller"),
    index = require("../../app/controllers/index.server.controller"),
    users = require("../../app/controllers/users.server.controller");

module.exports = function (app) {
    app.route("/room")
        .get(rooms.list)
        .get(function (req, res, next) {
            //console.log(req.room);
            //console.log(req.rooms);
            //console.log(req.rooms[0]);
            res.redirect("/" + req.session.rooms[0]._id);
        })
        .post(users.requiresLogin, rooms.create);
        // .post(function (req, res, next) {
        //     console.log(req.room);
        //     app.locals.room = req.room;/
        //     // Cannot use both of them
        //     next();
        //     //res.redirect("/");
        // });

    app.route("/room/update/:roomId")
        .post(users.requiresLogin, rooms.hasAuthorization, rooms.update);

    app.route("/room/delete/:roomId")
        .get(users.requiresLogin, rooms.hasAuthorization, rooms.list, rooms.delete)
        .get(function (req, res, next) {
            // console.log("rooms count: " + req.session.roomsCount);
            // console.log("rooms keys: " + Object.keys(req.session.rooms).length);
            // console.log("current room, after delete route: " + req.session.room._id);
            //
            // console.log(req.session.roomsCount >= 2);

            if (req.session.room && req.session.roomsCount >= 2) {
                // console.log(req.session.room._id == req.session.rooms[1]._id);
                // console.log(String(req.session.room._id) == String(req.session.rooms[0]._id));
                // console.log(req.session.rooms[0]._id);
                // console.log(req.session.rooms[req.session.roomsCount - (req.session.roomsCount - 1)]);
                // console.log(req.session.roomsCount - (req.session.roomsCount - 1));
                if (String(req.session.room._id) === String(req.session.rooms[0]._id)) {
                    req.session.room = req.session.rooms[req.session.roomsCount - (req.session.roomsCount - 1)];
                } else {
                    req.session.room = req.session.rooms[0];
                }
                // console.log(req.session.room._id);
                res.redirect("/" + req.session.room._id);
            }
            else if (req.session.room && req.session.roomsCount == 1) {
                res.redirect("/");
            }
        });

    app.route("/:roomId")
        .get(rooms.list)
        .get(function (req, res, next) {
            //console.log(Object.keys(req.session.rooms).length);

            for (var i = 0; i < Object.keys(req.session.rooms).length; i++) {
                // console.log("value of i: " + i);
                // console.log("rooms room id: " + req.session.rooms[i].id);
                // console.log("param room id: " + req.params.roomId);
                if (String(req.session.rooms[i]._id) === String(req.params.roomId)) {
                    // console.log("rooms rooms: " + req.session.rooms[i]);
                    req.session.room = req.session.rooms[i];
                    // console.log("currentRoom: " + req.session.room);
                    res.redirect("/");
                }
            }
        })
        .get(index.render);

    app.param("roomId", rooms.roomById);
};