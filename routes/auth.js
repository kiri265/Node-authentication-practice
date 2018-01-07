var express = require('express');
var router = express.Router();
module.exports = function (passport) {
    router.post('/login', passport.authenticate('login',
    { successRedirect: '/auth/success', failureRedirect: '/auth/failure' }));
    router.post('/signup', 
    passport.authenticate('signup',
        {
            successRedirect: '/auth/success',
            failureRedirect: '/auth/failure'
        }));
    router.get('/failure', function (req, res) {
        console.log('failure');
        res.send('failed');
    }
    );
    router.get('/success', function (req, res) {
        console.log('success');
        res.send({ state: 'success', user: req.user ? req.user : null });
    });

    return router;
}