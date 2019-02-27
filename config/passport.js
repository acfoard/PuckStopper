const jwtScript = require('./jwtConfig');
const db = require('../models');


const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

passport.use(
    'register',
    new localStrategy({
        usernameField: 'username',
        passwordField: 'password',
        session: false,
    },
    (username, password, done) => {
        try {
            db.user.findOne({
                where: {
                    username: username,
                },
            }).then(user => {
                if (user !== null) {
                    console.log('username already taken');
                    return done(null, false, {message: 'username already taken'});
                } else {
                    db.user.create({username, password}).then(user => {
                        console.log('user created');
                        return done(null, user);
                    });
                }
            });
        } catch (err) {
            done(err);
        }
    },
    ),
);