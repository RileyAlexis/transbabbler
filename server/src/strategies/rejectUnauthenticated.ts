import { Request, Response, NextFunction } from "express";

export const rejectUnauthenticated = (req: Request, res: Response, next: NextFunction) => {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.status(401).json({ message: 'Unauthorized: Please log in to access this resource' })
    }
}