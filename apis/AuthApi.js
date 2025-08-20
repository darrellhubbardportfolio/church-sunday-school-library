const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database(":memory:", err => err? console.error(err) : console.log("Successfully opened and connected to database!"));

function SignOut (req, res, next) {

    if (req.session && req.session.user) {

        req.session.destroy();
        console.log("session destroyed");
        res.redirect("/");
    }
}

function SignIn (req, res, next) {

    if (!req.session && !req.session.user) {

        // check if user exists
        var user = db.get('select * from Users where username = ?', [ req.body.username ], (err, row) => err ? console.error(err) : row);

        // check if a user exists
        // if the user exists, check if the passwords match
        // when they exist, create a session and proceed,
        // if by the chance they do not exist then redirect back to the login page and send an error message
        !user ? console.log('user not found') : user['password'] === req.body.password ? (req.session.user = user, next()) : (console.log('passwords do not match.'), res.redirect('/login'));
    }
}

function AuthenticateRoute (req, res, next) {

    if (req.session && req.session.user) {

        console.log("this site is protected");
        next();
    }
}

function AuthorizeAdminRoute (req, res, next) {

    if (req.session && req.session.user.role === 'admin') {

        console.log("only admin");
        next();
    }
}

function AuthorizeStudentRoute (req, res, next) {

    if (req.session && req.session.user.role === 'student') {

        console.log("only student");
        next();
    }
}

module.exports = {
    SignIn, 
    SignOut,
    AuthenticateRoute,
    AuthorizeAdminRoute,
    AuthorizeStudentRoute
}