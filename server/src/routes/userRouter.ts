import express from 'express';
import { checkAdmin } from '../strategies/checkAdmin';

//Types
import { Request, Response } from "express";
import passport from 'passport';
import { UserType } from '../types/UserType';
import { UserCollection } from '../models/userSchema';

const router = express.Router();

router.post('/login', (req, res, next) => {
    passport.authenticate('local', (error: Error, user: UserType) => {
        if (error) {
            res.status(500).json({ message: 'An error occurred during authentication' });
        } else if (!user) {
            res.status(401).json({ message: 'Username or password incorrect' });
            return;
        }

        req.logIn(user, (loginErr) => {
            if (loginErr) {
                res.status(500).json({ message: 'Login failed' });
            } else {
                res.status(200).send({ message: 'Logged in successfully', id: user._id, username: user.username, is_admin: user.is_admin });
            }
        });
    })(req, res, next);
})

router.get('/', (req: Request, res: Response) => {
    if (!req.isAuthenticated()) {
        return res.redirect('/login');
    }
    console.log('/api/users/ get called', req.user);
    const safeUser = req.user as UserType;


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
    console.log('/register', username)
    try {
        const existingUser = await UserCollection.findOne({ username });
        if (existingUser) {
            res.status(400).send('Username already exists');
        } else {
            const newUser = new UserCollection({ username, password });
            await newUser.save();
            res.send('User Registered Successfully');
        }
    } catch (error) {
        res.status(500).send('Server Error');
    }
});

router.get('/allUsers', checkAdmin, async (req: Request, res: Response) => {
    try {
        const users = await UserCollection.find();
        const usersWithoutPassword = users.map(user => {
            const { password, ...userWithoutPassword } = user.toObject();
            return userWithoutPassword;
        });
        res.status(200).send(usersWithoutPassword);
    } catch {
        res.sendStatus(500);
    }
});

router.delete('/removeUser', checkAdmin, async (req: Request, res: Response) => {
    const { userId } = req.body;
    console.log('/removeUser', userId);
    try {
        const userToRemove = await UserCollection.findById({ _id: userId });
        if (!userToRemove) {
            res.status(404).json({ message: "User not found" });
        } else {
            await UserCollection.deleteOne({ _id: userId });
            res.status(200).json({ message: `User ${userId} Deleted` });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to delete user" });
    }
})

module.exports = router;
