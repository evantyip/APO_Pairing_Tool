const passport = require('passport');
const mongoose = require('mongoose');

const requireLogin = require('../middlewares/requireLogin');
const User = mongoose.model('users');

module.exports = (app) => {
    app.get(
        '/auth/google',
        passport.authenticate('google', {
            scope: ['profile', 'email'],
        })
    );

    app.get(
        '/auth/google/callback',
        passport.authenticate('google'),
        (req, res) => {
            res.redirect('/data/list');
        }
    );

    app.get('/api/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    });

    app.get('/api/current_user', (req, res) => {
        res.send(req.user);
    });

    app.patch('/api/current_user', requireLogin, (req, res) => {
        try {
            console.log(req.body);
            // const updatedUser = await User.updateOne(
            //      { _user: req.user.id},
            //      {$set: {numQ: req.body}}
            // )
        } catch (err) {
            res.json({ message: err });
        }
    });
};
