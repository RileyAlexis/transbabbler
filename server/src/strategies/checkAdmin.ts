import { Response, NextFunction } from "express";

export const checkAdmin = async (req: any, res: Response, next: NextFunction) => {
    if (!req.isAuthenticated()) {
        res.status(401).json({ message: "Unauthorized. Please log in to access this feature" })
    } else if (!req.user || !req.user.is_admin) {
        res.status(401).json({ message: "Unauthorized. Admin access is required" })
    } else {
        next();
    }
}