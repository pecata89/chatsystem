exports.render = function(req, res, next) {
    res.render("layout", {
        // i can write a function about the conditional statements

        // PLURALS
        users: req.session.users ? req.session.users : ["error occured, please refresh the page"],
        rooms: req.session.rooms ? req.session.rooms : ["error occured, please refresh the page"],
        messages: req.session.messages ? req.session.messages : {},

        messagesSignIn: req.app.locals.messagesSignIn ? req.app.locals.messagesSignIn : "",
        messagesSignUp: req.app.locals.messagesSignUp ? req.app.locals.messagesSignUp : "",

        // CURRENT OBJECTS
        // HANDLED IN INDEX ROUTER
        currentUser: req.user ? req.user : "",
        // AND ROOMS ROUTER
        currentRoom: req.session.room ? req.session.room : "",

        //message: req.session.message ? req.session.message : "",

        url: req.url ? req.url : "",



        // TITLES
        signinTitle: "SIGN IN FORM",
        signupTitle: "SIGN UP FORM",
        usersListTitle: "USERS LIST",
        roomsListTitle: "CHAT ROOMS LIST"
    });
};