import express from 'express';
import { rejectUnauthenticated } from '../strategies/rejectUnauthenticated';

//DB
import { AdjectiveCollection, NounCollection, PrefixCollection, SuffixCollection, VerbCollection } from '../models/wordSchema'

//Types
import { Request, Response } from "express";

const router = express.Router();

router.get('/loadCollection/:type', async (req, res) => {
    const type = req.params.type;
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

router.delete('/deleteWord/:id/:type', rejectUnauthenticated, async (req, res) => {
    const id = req.params.id;
    const type = req.params.type;
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

router.post('/updateWord', rejectUnauthenticated, async (req, res) => {
    const { type, id, word } = req.body;

    const isAlpha = /^[a-zA-Z]+(-?[a-zA-Z]+)?(\s[a-zA-Z]+(-?[a-zA-Z]+)?)?$/.test(word);

    if (!isAlpha) {
        res.status(400).json({ message: "Invalid input: Word must contain only alphabetic characters" });
    } else if (isAlpha) {
        console.log('/updateWord called', id, word, type);
        try {
            let updateWord;
            switch (type) {
                case "nouns": updateWord = await NounCollection.findOneAndUpdate({ _id: id }, { $set: { word: word }, }, { returnDocument: 'after' }); break;
                case "verbs": updateWord = await VerbCollection.findOneAndUpdate({ _id: id }, { $set: { word: word }, }, { returnDocument: 'after' }); break;
                case "adjectives": updateWord = await AdjectiveCollection.findOneAndUpdate({ _id: id }, { $set: { word: word }, }, { returnDocument: 'after' }); break;
                case "prefixes": updateWord = await PrefixCollection.findOneAndUpdate({ _id: id }, { $set: { word: word }, }, { returnDocument: 'after' }); break;
                case "suffixes": updateWord = await SuffixCollection.findOneAndUpdate({ _id: id }, { $set: { word: word }, }, { returnDocument: 'after' }); break;
                default: res.status(400).json({ message: "Invalid Word Type" });
            }
            if (!updateWord) {
                res.status(400).json({ message: "Record not found" });
            } else {
                console.log(updateWord.word);
                res.status(200).json({ message: `Word ${word} in collection ${type} updated` });
            }
        } catch (error) {
            res.status(500).json({ message: "Error updating record" });
        }
    }
})

router.post('/addOneWord', rejectUnauthenticated, async (req: Request, res: Response) => {
    const { type, word } = req.body;

    const isAlpha = /^[a-zA-Z]+(-?[a-zA-Z]+)?(\s[a-zA-Z]+(-?[a-zA-Z]+)?)?$/.test(word);

    if (!isAlpha) {
        res.status(400).json({ message: "Invalid input: Word must contain only alphabetic characters" });
    } else if (isAlpha) {

        try {
            let newWord;
            switch (type) {
                case "nouns": newWord = new NounCollection({ word: word, category: "none" }); break;
                case "verbs": newWord = new VerbCollection({ word: word, category: "none" }); break;
                case "adjectives": newWord = new AdjectiveCollection({ word: word, category: "none" }); break;
                case "prefixes": newWord = new PrefixCollection({ word: word, category: "none" }); break;
                case "suffixes": newWord = new SuffixCollection({ word: word, category: "none" }); break;
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

router.post('/addManyWords', rejectUnauthenticated, async (req, res) => {
    try {
        const { words, type } = req.body;

        if (!Array.isArray(words) || words.some((word) => typeof word !== 'string')) {
            res.status(400).json({ message: "Invalid Input, must be an array of strings" })
        }

        const wordDocs = words.map((word: string) => ({ word }));
        let result;
        switch (type) {
            case "noun": result = await NounCollection.insertMany(wordDocs, { ordered: false }); break;
            case "verb": result = await VerbCollection.insertMany(wordDocs, { ordered: false }); break;
            case "adjective": result = await AdjectiveCollection.insertMany(wordDocs, { ordered: false }); break;
            case "prefix": result = await PrefixCollection.insertMany(wordDocs, { ordered: false }); break;
            case "suffix": result = await SuffixCollection.insertMany(wordDocs, { ordered: false }); break;
            default: res.status(400).json({ message: "Invalid Type" });
        }
        if (result) {
            res.status(200).json({ message: "Words successfully added to database" })
        }
    } catch (error: any) {
        if (error.code === 11000) {
            res.status(400).json({ message: "Some words were duplicates and not added" })
        } else {
            res.status(500).json({ message: "An error ocurred.", error: error.message });
        }
    }
});


module.exports = router;