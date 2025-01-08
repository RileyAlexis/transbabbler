import mongoose, { Schema } from "mongoose";
import bcrypt from 'bcryptjs';

import { UserType } from "../types/UserType";

const userSchema: Schema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    is_admin: { type: Boolean, required: false }
});

userSchema.pre<UserType>('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

export const UserCollection = mongoose.model<UserType>('userCollection', userSchema);