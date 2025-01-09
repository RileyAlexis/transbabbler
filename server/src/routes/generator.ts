import express from 'express';

//DB
import { AdjectiveCollection, DatabaseCollection, NounCollection, PrefixCollection, SuffixCollection, VerbCollection } from '../models/wordSchema';

//Types
import { Request, Response } from "express";
import { AdjectiveType, NounType, VerbType, PrefixType, SuffixType } from '../types/WordTypes';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const noun: NounType[] = await NounCollection.aggregate([{ $sample: { size: 1 } }]);
        const verb: VerbType[] = await VerbCollection.aggregate([{ $sample: { size: 1 } }]);
        const adjective: AdjectiveType[] = await AdjectiveCollection.aggregate([{ $sample: { size: 1 } }]);
        const prefix: PrefixType[] = await PrefixCollection.aggregate([{ $sample: { size: 1 } }]);
        const suffix: SuffixType[] = await SuffixCollection.aggregate([{ $sample: { size: 1 } }]);

        if (noun.length > 0) {
            res.status(200).json(`${verb[0].word} the ${prefix[0].word}${adjective[0].word} ${noun[0].word}`);
        } else {
            res.status(404).json({ message: "No Phrase found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error generating babbler" })
    }
});

router.get('generateFrom', async (req, res) => {
    const { dbName } = req.query;

    if (!dbName) {
        res.status(400).json({ message: "Dataset name is required" });
        return;
    }

    try {
        const dataset = await DatabaseCollection.findOne({ name: dbName });
        if (!dataset) {
            res.status(404).json({ message: "Dataset not found" });
            return;
        }
        const categories = ['nouns', 'verbs', 'adjectives', 'prefixes', 'suffixes'];

        const randomWords: Record<string, string | null> = {};
        for (const category of categories) {
            const words = dataset[category]; // Access the array for the category
            if (Array.isArray(words) && words.length > 0) {
                const randomIndex = Math.floor(Math.random() * words.length);
                randomWords[category] = words[randomIndex];
            } else {
                randomWords[category] = null; // If category is empty or not an array
            }
        }
        res.status(200).send(randomWords);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to generate phrase" });
    }
})


module.exports = router;
