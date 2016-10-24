var mongoose = require("mongoose"),
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

module.exports = function (io, socket) {
    // socket.broadcast.emit("chatMessage", {
    //     type: "status",
    //     text: "connected",
    //     created: Date.now(),
    //     user: socket.request.user.username
    // });

    socket.on("chatMessage", function (message) {
        message.type = "message";
        message.created = Date.now();
        message.user = socket.request.user.username;
        message.room = socket.request.session.room.roomName;

        // saving the message to the database
        var messagedb = new Message();
        messagedb.created = message.created;
        messagedb.message = message.message;
        messagedb.userId = socket.request.user;
        messagedb.roomId = socket.request.session.room;

        messagedb.save(function (err) {
            if (err) {
                console.log({message: getErrorMessage(err)});
            } else {
                // console.log("saved to the database");
                io.emit("chatMessage", message);
            }
        });
    });

    // socket.on("disconnect", function () {
    //     socket.broadcast.emit("chatMessage", {
    //         type: "status",
    //         text: "disconnected",
    //         created: Date.now(),
    //         user: socket.request.user.username
    //     });
    // });
};