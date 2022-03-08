import passport from 'passport';
import { Strategy as TwitterStrategy } from 'passport-twitter';
import User from "../models/usuario.js";

passport.use(new TwitterStrategy({
    consumerKey: process.env.TWITTER_API_KEY,
    consumerSecret: process.env.TWITTER_KEY_SECRET,
    callbackURL: 'http://localhost:8080/api/auth/twitter/callback'
    },
function (token, tokenSecret, profile, done) {
    User.findOne({
        username: profile.username
    }, function (err, user) {
        if (err) {
            return done(err);
        }
        if (!user) {
            user = new User({
                username: profile.username,
                password: profile.id,
                foto: profile.photos[0].value,
            });
            user.save(function (err) {
                if (err) {
                    return done(err);
                }
                return done(null, user);
            });
        } else {
            return done(null, user);
        }
    });
}
));

export default passport;