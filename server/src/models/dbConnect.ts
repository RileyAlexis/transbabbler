import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const mongoUser = process.env.MONGO_USER!;
const mongoPassword = process.env.MONGO_PASSWORD!;
const mongoAuthSource = process.env.MONGO_AUTH_SOURCE!;
const mongoHost = process.env.MONGO_HOST!;
const mongoDB = process.env.MONGO_DB!;
const mongoPort = "27017";

const mongoURI = `mongodb://${mongoUser}:${mongoPassword}@${mongoHost}:${mongoPort}/${mongoDB}?tls=true&authSource=${mongoAuthSource}&authMechanism=SCRAM-SHA-256`;

// Retry configuration
const RETRY_DELAY = 5000; // Delay between retries in milliseconds
const MAX_RETRIES = 5; // Maximum number of retry attempts

export const dbConnect = async (): Promise<void> => {
    let attempts = 0;

    while (attempts < MAX_RETRIES) {
        try {
            await mongoose.connect(mongoURI, {
                tlsCAFile: "./keys/caMongo.pem",
                tlsCertificateKeyFile: "./keys/mongo.pem",
            });
            mongoose.set("autoIndex", false);
            console.log("Connected to Mongo DB");
            return; // Exit the function after a successful connection
        } catch (error) {
            attempts++;
            console.error(`Error Connecting to Mongo DB (Attempt ${attempts}/${MAX_RETRIES}):`, error);

            if (attempts >= MAX_RETRIES) {
                console.error("Max retries reached. Could not connect to Mongo DB.");
                return; // Stop retrying after reaching the maximum number of retries
            }

            console.log(`Retrying in ${RETRY_DELAY / 1000} seconds...`);
            await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
        }
    }
};