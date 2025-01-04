import { MongoClient } from 'mongodb';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();


const mongoUser = process.env.MONGO_USER!;
const mongoPassword = process.env.MONGO_PASSWORD!;
const mongoHost = process.env.MONGO_HOST!;
const mongoPort = '27017';

const mongoURI = `mongodb://${mongoUser}:${mongoPassword}@${mongoHost}:${mongoPort}/?authSource=${process.env.MONGO_AUTH_SOURCE}`;
const ca = fs.readFileSync(process.env.MONGO_CA_FILE!);
const cert = fs.readFileSync(process.env.MONGO_CERT_KEY_FILE!);

const options = {
    ssl: true,
    sslCA: ca,
    sslCert: cert,
    sslKey: cert,
};

export const connectMongo = async () => {
    try {
        const client = new MongoClient(mongoURI, options);
        await client.connect();
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB', error);
    }
};
