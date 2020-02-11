const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const key = require('../config/keys');


passport.use(new GoogleStrategy(
    {
        clientID: key.googleClientID,
        clientKey: key.googleClientKey,
        callbackURL: 'http://localhost:5000/auth/google/callback'
    },
    (accessToken,refreshToken, profile,done)=>{
        console.log(accessToken);
        console.log(refreshToken);
        console.log(profile);
    }
));
