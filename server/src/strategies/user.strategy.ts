import { User } from "../models/userSchema";
import passport from 'passport';
import bcrypt from 'bcryptjs';
const LocalStrategy = require('passport-local').Strategy;

passport.serializeUser((user: any, done) => {
    done(null, user._id);
});

passport.deserializeUser(async (_id: string, done) => {
    try {
        const user = await User.findById(_id);
        done(null, user);
    } catch (error) {
        done(error);
    }
});

passport.use(new LocalStrategy(
    async (username: string, password: string, done: any) => {
        try {
            const user = await User.findOne({ username });
            if (!user) return done(null, false { message: "User not found" });

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) return done(null, false { message: "Incorrect password" });

            return done(null, user);
        } catch (error) {
            return done(error);
        }
    }
));

module.exports = passport;