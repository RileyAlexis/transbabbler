import express from 'express';
import { rejectUnauthenticated } from '../strategies/rejectUnauthenticated';
import { checkAdmin } from '../strategies/checkAdmin';

//DB
import { AdjectiveCollection, DatabaseCollection, NounCollection, PrefixCollection, SuffixCollection, VerbCollection } from '../models/wordSchema'

//Types
import { Request, Response } from "express";

const router = express.Router();

router.post('/createDatabase', checkAdmin, async (req: Request, res: Response) => {
    const { name } = req.body;
    console.log('/createDatabase route called', name);
    try {
        const existingDatabase = await DatabaseCollection.findOne({ name });
        if (existingDatabase) {
            res.status(400).json({ message: "Database name already exists" });
        } else {
            const newDatabase = new DatabaseCollection({
                name,
                nouns: [],
                verbs: [],
                adjectives: [],
                prefixes: [],
                suffixes: []
            });

            await newDatabase.save();
            res.status(201).json({ message: `New database ${name} created` });
        }
    } catch (error) {
        res.status(500).json({ message: "Failed to create database" });
    }
});

router.get('/databaseNames', async (req, res) => {
    try {
        const allDatabaseNames = await DatabaseCollection.find({}, { name: 1, _id: 1 });
        res.status(200).json(allDatabaseNames);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch database names" })
    }
});

router.delete('/deleteDataset', checkAdmin, async (req, res) => {
    const { dbName } = req.body;
    console.log('/deleteDataset called', dbName);
    try {
        const existingDatabase = await DatabaseCollection.findOne({ name: dbName });
        if (!existingDatabase) {
            res.status(404).json({ message: "Database Not Found" });
        } else {
            await DatabaseCollection.deleteOne({ name: dbName });
            res.status(200).json({ message: `Data set ${dbName} deleted` })
        }
    } catch (error) {
        res.status(500).json({ message: "Failed to delete database" });
    }
});



module.exports = router;