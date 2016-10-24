var users = require('../../app/controllers/users.server.controller'),
    index = require("../../app/controllers/index.server.controller"),
    rooms = require("../../app/controllers/rooms.server.controller");

module.exports = function(app) {
    app.route("/signin")
        .all(function (req, res, next) {
            res.redirect("/");
        });

    app.route('/signup')
        .all(function (req, res, next) {
            next();
        })
        .all(users.list, rooms.list)
        .get(index.render)
        .post(users.signup);

    app.get('/signout', users.signout);
};