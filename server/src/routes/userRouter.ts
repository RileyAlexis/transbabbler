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
            res.status(500).json({ message: 'An error occurred during authentication' });
        }
        if (!user) {
            res.status(401).json({ message: 'Login failed' });
        }
        req.logIn(user, (loginErr) => {
            if (loginErr) {
                res.status(500).json({ message: 'Login failed' });
            }
            res.status(200).send({ message: 'Logged in successfully', id: user._id, username: user.username, is_admin: user.is_admin });
        });
    })(req, res, next);
})



router.get('/', (req: Request, res: Response) => {
    if (!req.isAuthenticated()) {
        return res.redirect('/login');
    }
    console.log('/api/users/ get called', req.user);
    const safeUser = req.user as TUser;


    res.status(200).json({ message: 'Login Successful', user: { username: safeUser.username, is_admin: safeUser.is_admin } });
});

router.get('/logout', (req, res, next) => {
    console.log('Logout Route Called');
    req.logOut((error) => {
        if (error) return next(error);
        res.redirect('/');
    });
});

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
