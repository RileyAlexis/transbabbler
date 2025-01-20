import { Document } from "mongodb";

export interface UserType extends Document {
    username: string | null;
    is_admin: boolean;
    phrases?: string[];
}