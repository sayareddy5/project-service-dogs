const passport = require("passport");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');
require('dotenv').config();


passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://servicedogs.azurewebsites.net/user/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
        try {
            // genereate a username with the displayName
            let generatedUsername = generateUniqueUsername(profile.displayName);

            // check if the user exits with the users profile.id , we get from the google,
            // if the google email is already registred when manually isgning up, we need to consider that possibility too
            // so we filter by googleId and the email
            const user = await User.findOne({
                $or: [
                    { googleId: profile.id },
                    { email: profile.emails && profile.emails.length > 0 ? profile.emails[0].value : null },
                ],
            });
            

            if (user) {

                // return the user
                return done(null, user);
            } else {

                // check if the generate username name exits because we append random numners at the end, there is a possibility if the username already exists
                while (await User.findOne({ username: generatedUsername })) {
                    generatedUsername = generateUniqueUsername(profile.displayName);
                }

                // create a new user isntance
                const newUser = new User({
                    googleId: profile.id,
                    username: generatedUsername,
                    email: profile.emails[0].value,
                    firstName: profile.name.givenName,
                    lastName: profile.name.familyName,
                    
                });

                // save the new user
                await newUser.save();
                
                return done(null, newUser);
            }
        } catch (error) {
            return done(error, null);
        }
    }
));

function generateUniqueUsername(displayName) {
    // function used for generating a username which appends some random number and returns the generate username
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
