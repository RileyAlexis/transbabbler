import express from 'express';
import { rejectUnauthenticated } from '../strategies/rejectUnauthenticated';

//DB
import { NounCollection } from '../models/wordSchema'

//Types
import { Request, Response } from "express";
import { NounType } from '../Types/WordTypes';

const router = express.Router();

router.get('/loadNouns', async (req, res) => {
    try {
        const nouns = await NounCollection.find();
        res.status(200).json(nouns);
    } catch (error) {
        console.error(error);
    }
});

router.delete('/deleteOneNoun/:id', rejectUnauthenticated, async (req, res) => {
    const id = req.params.id;

    try {
        const deleteNoun = await NounCollection.findByIdAndDelete(id);
        if (!deleteNoun) {
            res.status(404).json({ message: 'Record not found' });
        }
        res.status(200).json({ message: 'Record deleted' });
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
            const newData: NounType = new NounCollection({ noun: noun, category: "none" });
            const savedData = await newData.save();
            res.status(200).json({ message: "Noun Added to DB" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Error Saving Data" });
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
})


module.exports = router;