import express from 'express';

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

router.delete('/deleteOneNoun/:id', async (req, res) => {
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


module.exports = router;