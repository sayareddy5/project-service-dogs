const passport = require("passport");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');
require('dotenv').config();


passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/user/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
        try {
            let generatedUsername = generateUniqueUsername(profile.displayName);
            const user = await User.findOne({ googleId: profile.id });

            if (user) {
                return done(null, user);
            } else {
                while (await User.findOne({ username: generatedUsername })) {
                    generatedUsername = generateUniqueUsername(profile.displayName);
                }

                const newUser = new User({
                    googleId: profile.id,
                    username: generatedUsername,
                    email: profile.emails[0].value,
                    firstName: profile.name.givenName,
                    lastName: profile.name.familyName,
                    
                });

                await newUser.save();
                
                return done(null, newUser);
            }
        } catch (error) {
            return done(error, null);
        }
    }
));

function generateUniqueUsername(displayName) {
    const baseUsername = displayName.replace(/\s/g, '').toLowerCase();
    const randomSuffix = Math.floor(Math.random() * 9000) + 1000
    const uniqueUsername = `${baseUsername}${randomSuffix}`;

    return uniqueUsername;
}


passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});

module.exports = passport;
