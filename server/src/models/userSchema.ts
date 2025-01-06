import mongoose, { Document, Schema } from "mongoose";
import bcrypt from 'bcryptjs';

export interface TUser extends Document {
    username: string;
    password: string;
    is_admin: boolean;
}

const userSchema: Schema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    is_admin: { type: Boolean, required: false }
});

userSchema.pre<TUser>('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

export const User = mongoose.model<TUser>('User', userSchema);