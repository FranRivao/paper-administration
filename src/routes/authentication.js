const express = require('express');
const router = express.Router();
const passport = require('passport');
const { isNotLoggedIn, isLoggedIn } = require('../lib/auth');

router.get('/signup', isNotLoggedIn, (req, res) => {
    res.render('auth/signup');
});

router.post('/signup', isNotLoggedIn, passport.authenticate('local.signup', {
        successRedirect: '/',
        failureRedirect: '/signup'
}));

router.get('/signin', isNotLoggedIn, (req, res) => {
    res.render('auth/signin');
});

router.post('/signin', isNotLoggedIn, (req, res, next) => {
    passport.authenticate('local.signin', {
        successRedirect: '/',
        failureRedirect: '/signin'
    })(req, res, next);
});

router.get('/logout', isLoggedIn, (req, res, next) => {
    req.logout(function(err) {
       if (err) { return next(err); }
       res.redirect('/');
    });
});

module.exports = router;