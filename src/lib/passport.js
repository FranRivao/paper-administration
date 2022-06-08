const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const pool = require('../database');
const helpers = require('../lib/helpers');

// User sign up
passport.use('local.signup', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    const User = {
        username, password
    };
    User.password = await helpers.encryptPassword(User.password);

    const result = await pool.query('INSERT INTO users SET ?', [User]);
    User.id = result.insertId;
    return done(null, User);
})); 

// User sign in
passport.use('local.signin', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    const rows = await pool.query('SELECT * FROM users WHERE username = ?', [username]);

    if (rows.length > 0) {
        const user = rows[0];
        const valid = await helpers.matchPassword(password, user.password);

        if (valid) {
            done(null, user);
        } else {
            return done(null, false, req.flash('error', 'El usuario no existe'));
        }
    }
}));

// User serialization
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// User deserialization
passport.deserializeUser(async (id, done) => {
    const rows = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
    done(null, rows[0]);
});