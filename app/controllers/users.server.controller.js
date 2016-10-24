var User = require('mongoose').model('User'),
    passport = require('passport');

var getErrorMessage = function(err) {
    var message = '';
    if (err.code) {
        switch (err.code) {
            case 11000:
            case 11001:
                message = 'Username already exists';
                break;
            default:
                message = 'Something went wrong';
        }
    } else {
        for (var errName in err.errors) {
            if (err.errors[errName].message) message = err.errors[errName].
                message;
        }
    }
    return message;
};

exports.list = function (req, res, next) {
    User.find()
        .sort("-created")
        .exec(function (err, users) {
            if (err) {
                res.status(400).send({
                    message: getErrorMessage(err)
                });
            } else {
                req.session.users = users;
                next();
            }
        });
};

//exports.renderSignin = function(req, res, next) {
//    if (!req.user) {
//        res.render('users/signin', {
//            title: 'Sign-in Form',
//            messages: req.flash('error') || req.flash('info')
//        });
//    } else {
//        return res.redirect('/');
//    }
//};

//exports.renderSignup = function(req, res, next) {
//    if (!req.user) {
//        res.render('users/signup', {
//            title: 'Sign-up Form',
//            messages: req.flash('error')
//        });
//    } else {
//        return res.redirect('/');
//    }
//};

exports.signup = function(req, res, next) {
    if (!req.user) {
        var user = new User(req.body);
        var message = null;
        user.provider = 'local';
        user.save(function(err) {
            if (err) {
                var message = getErrorMessage(err);
                req.flash('error', message);
                return res.redirect('/signup');
            }
            req.login(user, function(err) {
                if (err) return next(err);
                return res.redirect('/');
            });
        });
    } else {
        return res.redirect('/');
    }
};

exports.signout = function(req, res) {
    req.logout();
    res.redirect('/');
};

exports.requiresLogin = function (req, res, next) {
    if (!req.isAuthenticated()) {
        return res.status(401).send({
            message: "User is not logged in"
        });
    }
    next();
};