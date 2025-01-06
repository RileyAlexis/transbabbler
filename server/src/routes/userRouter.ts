import express from 'express';

import { TUser, User } from '../models/userSchema';

//Types
import { Request, Response } from "express";
import passport from 'passport';
import { rejectUnauthenticated } from '../strategies/rejectUnauthenticated';

const router = express.Router();

router.post('/login', (req, res, next) => {
    passport.authenticate('local', (error: Error, user: TUser) => {
        if (error) {
            return res.status(500).json({ message: 'An error occurred during authentication' });
        }
        if (!user) {
            return res.status(401).json({ message: 'Login failed' });
        }
        req.logIn(user, (loginErr) => {
            if (loginErr) {
                return res.status(500).json({ message: 'Login failed' });
            }
            return res.status(200).send({ message: 'Logged in successfully', id: user._id, username: user.username, is_admin: user.is_admin });
        });
    })(req, res, next);
})



router.get('/', (req, res) => {
    if (!req.isAuthenticated()) {
        return res.redirect('/login');
    }
    res.send('Login Successful');
});

router.get('/logout', (req, res, next) => {
    console.log('Logout Route Called');
    req.logOut((error) => {
        if (error) return next(error);
        res.redirect('/');
    });
});

router.get('/profile', rejectUnauthenticated, (req, res) => {
    console.log(req.user);
    res.status(200).json({ user: req.user });

})

router.post('/register', async (req: Request, res: Response) => {
    const { username, password } = req.body;
    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) res.status(400).send('Username already exists');
        const newUser = new User({ username, password });
        await newUser.save();
        res.send('User Registered Successfully');
    } catch (error) {
        res.status(500).send('Server Error');
    }
})


module.exports = router;
