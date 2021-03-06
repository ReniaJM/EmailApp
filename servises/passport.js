const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');

const mongoose = require('mongoose');

const User = mongoose.model('Users');


passport.use(new GoogleStrategy(
    {
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback'
    },
    async (accessToken,refreshToken, profile, done) => {
        const user = await new User({googleId: profile.id}).save();
            done(null,user)

        // console.log(accessToken);
        // console.log(refreshToken);
        // console.log(profile);
    }
));
