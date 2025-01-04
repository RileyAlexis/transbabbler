import express from 'express';
import cors from 'cors';
import passport from 'passport';
import session from 'express-session';
import dotenv from 'dotenv';
import path from 'path';

//Routes
const wordRouter = require('./routes/wordRouter');
const userRouter = require('./routes/userRouter');

//MongoDB
import { dbConnect } from './models/dbConnect';

//Types
import { Request, Response } from 'express';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(session({
    secret: process.env.SERVER_SECRET || '45654ngfmkdfkgfld4',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

dbConnect();

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));
    app.get('*', (req: Request, res: Response) => {
        res.sendFile(path.resolve(__dirname, '../client/dist', 'index.html'));
    });
}

app.get('/api', (req: Request, res: Response) => {
    res.json({ message: 'Backend server is connected' });
});

app.use('/api/words', wordRouter);
app.use('/api/users', userRouter);


const port = process.env.PORT || 5001;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});