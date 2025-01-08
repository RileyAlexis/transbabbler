import { UserCollection } from "../models/userSchema";
import passport from 'passport';
import bcrypt from 'bcryptjs';
import { Strategy as LocalStrategy } from "passport-local";

passport.serializeUser((user: any, done) => {
    console.log('serializeUser', user);
    done(null, user._id);
});

passport.deserializeUser(async (_id: string, done) => {
    try {
        const user = await UserCollection.findById(_id);
        console.log('DeserializeUser', user);
        done(null, user);
    } catch (error) {
        done(error);
    }
});

passport.use(new LocalStrategy(
    async (username: string, password: string, done: any) => {
        try {
            const user = await UserCollection.findOne({ username });
            if (!user) return done(null, false, { message: "User not found" });

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) return done(null, false, { message: "Incorrect password" });

            return done(null, user);
        } catch (error) {
            return done(error);
        }
    }
));

module.exports = passport;