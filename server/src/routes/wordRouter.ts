import express from 'express';
import { rejectUnauthenticated } from '../strategies/rejectUnauthenticated';

//DB
import { AdjectiveCollection, DatabaseCollection, NounCollection, PrefixCollection, SuffixCollection, VerbCollection } from '../models/wordSchema'

//Types
import { Request, Response } from "express";
import { NounType, VerbType, AdjectiveType, PrefixType, SuffixType } from '../types/WordTypes';
import { checkAdmin } from '../strategies/checkAdmin';

const router = express.Router();

router.get('/loadCollection', async (req, res) => {
    const { databaseName, type } = req.query;

    if (!['nouns', 'verbs', 'adjectives', 'prefixes', 'suffixes'].includes(type as string)) {
        res.status(400).json({ message: "Invalid word type" });
        return;
    }

    try {
        const database = await DatabaseCollection.findOne({ name: databaseName });
        if (!database) {
            res.status(404).json({ message: "Database not found" });
            return;
        }

        const collection = database[type as keyof typeof database];
        if (!collection) {
            res.status(404).json({ message: `${type} collection not found` });
            return;
        }

        res.status(200).json(collection);
    } catch (error) {
        console.error("Error loading collection:", error);
        res.status(500).json({ message: "Failed to load collection" });
    }
});

router.delete('/deleteWord/', checkAdmin, async (req, res) => {
    const { databaseName, type, word } = req.body;

    try {
        const database = await DatabaseCollection.findOne({ name: databaseName });
        if (!database) {
            res.status(400).json({ message: "Database not found" });
            return;
        }

        if (!['nouns', 'verbs', 'adjectives', 'prefixes', 'suffixes'].includes(type)) {
            res.status(400).json({ message: "Invalid word type" });
            return;
        }

        const wordIndex = (database[type] as any).findIndex((item: any) => item.word === word);

        if (wordIndex === -1) {
            res.status(404).json({ message: `Word ${word} not found in ${databaseName} ${type}` });
            return;
        }

        (database[type] as any).splice(wordIndex, 1);
        await database.save();
        res.status(200).json({ message: `Word ${word} deleted from ${databaseName} ${type}` })
    } catch (error) {
        res.status(500).json({ message: "Error deleting record" });
    }
});

router.post('/updateWord', checkAdmin, async (req, res) => {
    const { databaseName, type, originalWord, newWord } = req.body;

    const isAlpha = /^[a-zA-Z]+(-?[a-zA-Z]+)?(\s[a-zA-Z]+(-?[a-zA-Z]+)?)?$/.test(originalWord);

    if (!isAlpha) {
        res.status(400).json({ message: "Invalid input: Word must contain only alphabetic characters" });
    } else if (isAlpha) {
        try {
            if (!['nouns', 'verbs', 'adjectives', 'prefixes', 'suffixes'].includes(type)) {
                res.status(400).json({ message: "Invalid word type" });
                return;
            }
            const database = await DatabaseCollection.findOne({ name: databaseName });

            if (!database) {
                res.status(404).json({ message: "Database not found" });
                return;
            }

            const wordIndex = (database[type] as any).findIndex((entry: any) => entry.word === originalWord);

            if (wordIndex === -1) {
                res.status(404).json({ message: `Word '${originalWord}' not found in ${type}` });
                return;
            }
            if (newWord) {
                (database[type] as any)[wordIndex].word = newWord;
            }

            await database.save();

            res.status(200).json({ message: `Word '${originalWord}' updated successfully in ${type}` });
        } catch (error) {
            res.status(500).json({ message: "Error updating record" });
        }
    }
})

router.post('/addOneWord', checkAdmin, async (req: Request, res: Response) => {
    const { databaseName, type, word } = req.body;
    const category = "none";
    const isAlpha = /^[a-zA-Z]+(-?[a-zA-Z]+)?(\s[a-zA-Z]+(-?[a-zA-Z]+)?)?$/.test(word);

    try {

        if (!isAlpha) {
            res.status(400).json({ message: "Invalid input: Word must contain only alphabetic characters" });
            return;
        }

        if (!['nouns', 'verbs', 'adjectives', 'prefixes', 'suffixes'].includes(type)) {
            res.status(400).json({ message: "Invalid collection type" });
            return;

        }
        const database = await DatabaseCollection.findOne({ name: databaseName });
        if (!database) {
            res.status(400).json({ message: "Database not found" });
            return; // Return after sending the response to prevent further execution
        }

        const newWord = { word, category };

        (database[type] as any).push(newWord);
        await database.save();
        res.status(201).json({ message: `${word} added to ${type} in ${databaseName}` })
    } catch (error) {
        console.error('Error adding word', error);
        res.status(500).json({ message: "Failed to add word" });
    }
});

router.post('/addManyWords', checkAdmin, async (req: Request, res: Response) => {
    const { databaseName, type, words } = req.body;
    const category = "none";

    try {
        if (!Array.isArray(words) || words.length === 0) {
            res.status(400).json({ message: "Invalid input: 'words' must be a non-empty array of strings" });
            return;
        }

        if (!['nouns', 'verbs', 'adjectives', 'prefixes', 'suffixes'].includes(type)) {
            res.status(400).json({ message: "Invalid collection type" });
            return;
        }

        const database = await DatabaseCollection.findOne({ name: databaseName });
        if (!database) {
            res.status(400).json({ message: "Database not found" });
            return;
        }

        const isAlphaRegex = /^[a-zA-Z]+(-?[a-zA-Z]+)?(\s[a-zA-Z]+(-?[a-zA-Z]+)?)?$/;
        const validWords = words.filter(word => isAlphaRegex.test(word));
        const invalidWords = words.filter(word => !isAlphaRegex.test(word));

        if (validWords.length === 0) {
            res.status(400).json({ message: "No valid words to add. Ensure words contain only alphabetic characters." });
            return;
        }

        const newWords = validWords.map(word => ({ word, category }));
        (database[type] as any).push(...newWords);
        await database.save();

        res.status(201).json({
            message: `${validWords.length} word(s) added to ${type} in ${databaseName}`,
            invalidWords: invalidWords.length > 0 ? invalidWords : undefined,
        });
    } catch (error) {
        console.error('Error adding words', error);
        res.status(500).json({ message: "Failed to add words" });
    }
});


module.exports = router;