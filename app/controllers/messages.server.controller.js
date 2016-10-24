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

// ROUTER "/MESSAGE" METHOD POST
// exports.create = function (req, res) {
//     var message = new Message(req.body);
//     //console.log(req.body);
//     message.userId = req.user;
//     //console.log(req.user);
//     message.roomId = req.session.room;
//     //console.log(req.room);
//
//     message.save(function (err) {
//         if (err) {
//             return res.status(400).send({
//                 message: getErrorMessage(err)
//             });
//         } else {
//             res.redirect("/");
//         }
//     });
// };

exports.list = function(req, res, next) {
    Message.find({})
        //.sort("-created")
        .populate("userId", "firstName lastName fullName username")
        .populate("roomId", "id roomName")
        .exec(function (err, messages) {
            if (err) {
                return res.status(400).send({
                    message: getErrorMessage(err)
                });
            } else {
                req.session.messages = messages;
                next();
            }
        });
};