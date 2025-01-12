import mongoose from "mongoose";
import dotenv from "dotenv";
import path from 'path';
import fs from 'fs';
dotenv.config();

const mongoUser = process.env.MONGO_USER!;
const mongoPassword = process.env.MONGO_PASSWORD!;
const mongoAuthSource = process.env.MONGO_AUTH_SOURCE!;
const mongoHost = process.env.MONGO_HOST!;
const mongoDB = process.env.MONGO_DB!;
const mongoTLS = process.env.MONGO_TLS_CERT!;
const mongoCA = process.env.MONGO_CA!;
const mongoPFX = process.env.MONGO_PFX!;
const mongoPort = "27017";

const mongoURI = `mongodb://${mongoUser}:${mongoPassword}@${mongoHost}:${mongoPort}/${mongoDB}?tls=true&authSource=${mongoAuthSource}&authMechanism=SCRAM-SHA-256`;

const RETRY_DELAY = 5000;
const MAX_RETRIES = 25;

export const dbConnect = async (): Promise<void> => {
    let attempts = 0;

    const tlsCertBuffer = Buffer.from(mongoTLS, "base64");
    const caCertBuffer = Buffer.from(mongoCA, "base64");
    const pfxBuffer = Buffer.from(mongoPFX);


    while (attempts < MAX_RETRIES) {
        try {
            await mongoose.connect(mongoURI, {
                // cert: tlsCertBuffer,
                // ca: caCertBuffer,
                // pfx: pfxBuffer,
                // passphrase: '',
                tlsCertificateKeyFile: "./keys/mongo.pem",
                tlsCAFile: "./keys/caMongo.pem",
            });
            mongoose.set("autoIndex", false);
            console.log("Connected to Mongo DB");
            return;
        } catch (error) {
            attempts++;
            console.error(`Error Connecting to Mongo DB (Attempt ${attempts}/${MAX_RETRIES}):`, error);

            if (attempts >= MAX_RETRIES) {
                console.error("Max retries reached. Could not connect to Mongo DB.");
                return;
            }

            console.log(`Retrying in ${RETRY_DELAY / 1000} seconds...`);
            await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
        }
    }
};