var mongoose = require("mongoose"),
    Room = mongoose.model("Room"),
    Message = mongoose.model("Message");

var getErrorMessage = function (err) {
    if (err.errors) {
        for (var errName in err.errors) {
            if (err.errors[errName].message) return err.errors[errName].message;
        }
    } else {
        return "Unknown server error";
    }
};

// ROUTER "/ROOM" METHOD POST
exports.create = function (req, res) {
    var room = new Room(req.body);
    room.creator = req.user;

    room.save(function (err) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.redirect("/room");
            // I NEED REDIRECT BECAUSE I GOT TO GET TO THE GET METHOD
            // AND ASSIGN CURRECTROOM
            // AND FROM THERE TO GO TO THE INDEX AND NEWLY CREATED ROOM
            //next();
        }
    });
};

exports.list = function(req, res, next) {
    Room.find({})
        .sort("-created")
        .populate("creator", "firstName lastName fullName username")
        .exec(function (err, rooms) {
            if (err) {
                return res.status(400).send({
                    message: getErrorMessage(err)
                });
            } else {
                Room.count({}, function (err, roomsCount) {
                    req.session.roomsCount = roomsCount;
                });
                req.session.rooms = rooms;
                next();
            }
        });
};

exports.roomById = function (req, res, next, id) {
    Room.findById(id)
        .populate("creator", "firstName lastName fullName username")
        .exec(function (err, room) {
            if (err) {
                return next(err);
            }
            else if (!room) {
                return next(new Error("Failed to load room with id: " + id));
            }
            else {
                req.session.room = room;
                next();
            }
        });
};

exports.read = function (req, res, next) {
    req.session.room;
    next();
};

exports.update = function (req, res, next) {
    var room = req.session.room;

    room.roomName = req.body.roomName;

    room.save(function (err) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.redirect("/" + req.session.room._id);
        }
    });
};

exports.delete = function (req, res, next) {
    var room = req.session.room;

    Message.remove({roomId: room._id}, function (err) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            //console.log("maybe it works");
            room.remove(function (err) {
                if (err) {
                    return res.status(400).send({
                        message: getErrorMessage(err)
                    });
                } else {
                    next();
                }
            });
        }
    });
};

exports.hasAuthorization = function (req, res, next) {
    if (req.session.room.creator.username !== req.user.username) {
        return res.status(403).send({
            message: "User is not authorized"
        });
    }
    next();
};