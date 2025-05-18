import express from 'express';
import cors from 'cors';
import session from 'express-session';
import dotenv from 'dotenv';
import path from 'path';

const passport = require('./strategies/user.strategy');

//Routes
const wordRouter = require('./routes/wordRouter');
const userRouter = require('./routes/userRouter');
const generator = require('./routes/generator');
const data = require('./routes/dataRouter');

//MongoDB
import { dbConnect } from './models/dbConnect';

//Types
import { Request, Response } from 'express';

dotenv.config();

const corsOptions = {
    origin: function (origin: any, callback: any) {
        console.log('Incoming Origin:', origin);
        const allowedOrigins = [
            'http://localhost:5173',
            'https://localhost:5173',
            'http://transphasic.asuscomm.com',
            'https://transphasic.asuscomm.com',
        ]

        if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true);  // Allow if origin matches or if no origin
        } else {
            callback(new Error('Not allowed by CORS'));  // Reject otherwise
        }
    },
    credentials: true,  // Allow cookies to be sent across origins
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Content-Length', 'X-Kuma-Revision'],
};

declare module 'express-session' {
    interface SessionData {
        user: { username: string };
        is_admin: { is_admin: boolean };
    }
}


const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use(session({
    secret: process.env.SERVER_SECRET || '45654ngfmkdfkgfld4',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
    },
}));

app.use(passport.initialize());
app.use(passport.session());

dbConnect();

app.get('/api', (req: Request, res: Response) => {
    res.json({ message: 'Backend server is connected' });
});

app.use('/api/words', wordRouter);
app.use('/api/users', userRouter);
app.use('/api/generator', generator);
app.use('/api/data', data);

const port = process.env.PORT || 5001;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});