// var rooms = require("../../app/controllers/rooms.server.controller"),
//     index = require("../../app/controllers/index.server.controller"),
//     users = require("../../app/controllers/users.server.controller"),
//     messages = require("../../app/controllers/messages.server.controller");
//
// module.exports = function (app) {
//     app.route("/:roomId/message")
//         .post(users.requiresLogin, messages.create);
//
//     app.param("roomId", rooms.roomById);
// };