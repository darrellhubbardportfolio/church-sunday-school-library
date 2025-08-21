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
        if(user) {
            // check if passwords are a match
            if (user['password'] === req.body.password) {
            
                // create a session
                req.session.user = user;
                // check role and redirect
                if (user.role === 'admin') {
                    res.redirect('/admin');
                } 
                if (user.role === 'student') {
                    res.redirect('/student');
                }
            } else {
                console.log('passwords are not matching');
            }
        }
        else {
            console.log('user is not found');
        }
    }
}

function SignUp (req, res, next) {

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

function UpdateLastLoginActivity (id) {
    const query = 'update on Users set lastLoginActivity = current_date where id = ?';
    db.run(query, [ id ], err => {
        if (err) {
            console.error(err);
        }
        console.log('updated last login activity');
    });
}

module.exports = {
    SignIn, 
    SignOut,
    SignUp,
    AuthenticateRoute,
    AuthorizeAdminRoute,
    AuthorizeStudentRoute
}