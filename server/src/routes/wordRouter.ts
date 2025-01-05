import express from 'express';
import { rejectUnauthenticated } from '../strategies/rejectUnauthenticated';

//DB
import { AdjectiveCollection, NounCollection, PrefixCollection, SuffixCollection, VerbCollection } from '../models/wordSchema'

//Types
import { Request, Response } from "express";
import { AdjectiveType, NounType, VerbType, PrefixType, SuffixType } from '../Types/WordTypes';

const router = express.Router();

router.get('/loadNouns', async (req, res) => {
    try {
        const nouns = await NounCollection.find();
        res.status(200).json(nouns);
    } catch (error) {
        console.error(error);
    }
});

router.get('/loadCollection/:type', async (req, res) => {
    const type = req.params.type;
    console.log('/loadCollection', type);
    let collectionToLoad;

    try {
        switch (type) {
            case "nouns": collectionToLoad = await NounCollection.find(); break;
            case "verbs": collectionToLoad = await VerbCollection.find(); break;
            case "adjectives": collectionToLoad = await AdjectiveCollection.find(); break;
            case "prefixes": collectionToLoad = await PrefixCollection.find(); break;
            case "suffixes": collectionToLoad = await SuffixCollection.find(); break;
            default: res.status(400).json({ message: "Invalid Collection" });
        }

        if (collectionToLoad) {
            res.status(201).json(collectionToLoad);
        }
    } catch (error) {
        res.status(500).json({ message: "Error retrieving collection" });
    }
});

router.delete('/deleteWord/:id/:type', async (req, res) => {
    const id = req.params.id;
    const type = req.params.type;
    console.log('/deleteWord', id, type);
    try {
        let newWord;
        switch (type) {
            case "nouns": newWord = await NounCollection.findByIdAndDelete(id); break;
            case "verbs": newWord = await VerbCollection.findByIdAndDelete(id); break;
            case "adjectives": newWord = await AdjectiveCollection.findByIdAndDelete(id); break;
            case "prefixes": newWord = await PrefixCollection.findByIdAndDelete(id); break;
            case "suffixes": newWord = await SuffixCollection.findByIdAndDelete(id); break;
            default: res.status(400).json({ message: "Invalid Word Type" });
        }
        if (!newWord) {
            res.status(404).json({ message: "Record not found" });
        } else {
            res.status(200).json({ message: "Record Deleted" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error deleting record" });
    }
});

router.delete('/deleteOneNoun/:id', rejectUnauthenticated, async (req, res) => {
    const id = req.params.id;

    try {
        const deleteNoun = await NounCollection.findByIdAndDelete(id);
        if (!deleteNoun) {
            res.status(404).json({ message: 'Record not found' });
        }
        res.status(200).json({ message: 'Record Deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting record' });
    }
});

router.post('/AddOneNoun', async (req: Request, res: Response) => {
    const { noun } = req.body;

    const isAlpha = /^[a-zA-Z]+(-?[a-zA-Z]+)?(\s[a-zA-Z]+(-?[a-zA-Z]+)?)?$/.test(noun);
    console.log(req.body);
    console.log('AddOneNoun called', noun, isAlpha);

    if (!isAlpha) {
        res.status(400).json({ message: "Invalid input: Noun must contain only alphabetic characters" });
    } else if (isAlpha) {

        try {
            const newData: NounType = new NounCollection({ word: noun, category: "none" });
            const savedData = await newData.save();
            res.status(200).json({ message: "Noun Added to DB" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Error Saving Data" });
        }
    }
});

router.post('/AddOneWord', async (req: Request, res: Response) => {
    const { type, word } = req.body;
    console.log(`AddOneWord called. Type: ${type}, Word: ${word}`);

    const isAlpha = /^[a-zA-Z]+(-?[a-zA-Z]+)?(\s[a-zA-Z]+(-?[a-zA-Z]+)?)?$/.test(word);

    if (!isAlpha) {
        res.status(400).json({ message: "Invalid input: Word must contain only alphabetic characters" });
    } else if (isAlpha) {

        try {
            let newWord;
            switch (type) {
                case "noun": newWord = new NounCollection({ word: word, category: "none" }); break;
                case "verb": newWord = new VerbCollection({ word: word, category: "none" }); break;
                case "adjective": newWord = new AdjectiveCollection({ word: word, category: "none" }); break;
                case "prefix": newWord = new PrefixCollection({ word: word, category: "none" }); break;
                case "suffix": newWord = new SuffixCollection({ word: word, category: "none" }); break;
                default: res.status(400).json({ message: "Invalid Word Type" });
            }
            if (newWord) {
                const savedData = await newWord.save();
                res.status(201).json({ message: `${word} added successfully to ${type} collection.`, data: savedData, });
            }
        } catch (error) {
            res.status(500).json({ message: "Error saving word", error: error });
        }
    }
});

router.post('/AddManyNouns', async (req, res) => {
    try {
        const { nouns } = req.body;

        if (!Array.isArray(nouns) || nouns.some((noun) => typeof noun !== 'string')) {
            res.status(400).json({ message: "Invalid Input, must be an array of strings" });
        }

        const nounDocs = nouns.map((noun: string) => ({ noun }));
        const result = await NounCollection.insertMany(nounDocs, { ordered: false });
        res.status(201).json({
            message: `${result.length} nouns successfully added to the database.`,
            insertedWords: result.map((doc) => doc.noun)
        });
    } catch (error: any) {
        if (error.code === 11000) {
            res.status(400).json({
                message: "Some nouns were duplicates and not added",
                error: error.message,
            });
        } else {
            console.error("Error inserting nouns:", error);
            res.status(500).json({ message: "An error occurred.", error: error.message })
        }
    }
});


module.exports = router;