import mongoose from "mongoose";
import dotenv from 'dotenv';
import fs from 'fs';
dotenv.config();


const mongoUser = process.env.MONGO_USER!;
const mongoPassword = process.env.MONGO_PASSWORD!;
const mongoAuthSource = process.env.MONGO_AUTH_SOURCE!;
const mongoHost = process.env.MONGO_HOST!;
const mongoDB = process.env.MONGO_DB!;
const mongoPort = '27017';

const mongoURI = `mongodb://${mongoUser}:${mongoPassword}@${mongoHost}:${mongoPort}/${mongoDB}?tls=true&authSource=${mongoAuthSource}&authMechanism=SCRAM-SHA-256`;

export const dbConnect = async (): Promise<void> => {
    try {
        await mongoose.connect(mongoURI, {
            tlsCAFile: './keys/caMongo.pem',
            tlsCertificateKeyFile: './keys/mongo.pem'
        });
        // if (process.env.NODE_ENV === 'production') {
        mongoose.set('autoIndex', false);
        // }
        console.log("Connected to Mongo DB");
    } catch (error) {
        console.log("Error Connecting to Mongo DB", error);
        process.exit(1);
    }
}