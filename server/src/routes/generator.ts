import express from 'express';

//DB
import { AdjectiveCollection, NounCollection, PrefixCollection, SuffixCollection, VerbCollection } from '../models/wordSchema';

//Types
import { Request, Response } from "express";
import { AdjectiveType, NounType, VerbType, PrefixType, SuffixType } from '../Types/WordTypes';

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


module.exports = router;
