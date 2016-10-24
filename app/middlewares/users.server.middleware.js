module.exports = function(app) {
    app.use(function (req, res, next) {

        // ERROR MESSAGES FOR SIGN IN
        if (!req.session.user && req.url == "/") {
            req.app.locals.messagesSignIn = req.flash('error') || req.flash('info');
        }

        // ERROR MESSAGES FOR SIGN UP
        if (!req.session.user && req.url == "/signup") {
            req.app.locals.messagesSignUp = req.flash('error');
        }

        next();
    });
};