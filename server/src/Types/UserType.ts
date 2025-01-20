import { Document } from "mongoose";

export interface UserType extends Document {
    username: string;
    password: string;
    is_admin: boolean;
    phrases?: string[];
}