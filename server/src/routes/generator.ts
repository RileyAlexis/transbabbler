import express from 'express';

//DB
import { AdjectiveCollection, DatabaseCollection, NounCollection, PrefixCollection, SuffixCollection, VerbCollection } from '../models/wordSchema';

//Types
import { Request, Response } from "express";
import { AdjectiveType, NounType, VerbType, PrefixType, SuffixType } from '../types/WordTypes';

const router = express.Router();

type WordType = "verb" | "prefix" | "adjective" | "noun";

type WordDatabase = {
    [key in WordType]: string[];
};

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

router.get('/generateFrom', async (req, res) => {
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
        const randomWords = await DatabaseCollection.aggregate([
            { $match: { name: dbName } }, // Match the dataset by name
            {
                $project: {
                    _id: 0, // Exclude the _id field
                    randomVerb: {
                        $cond: {
                            if: { $gt: [{ $size: "$verbs" }, 0] }, // Check if verbs array is not empty
                            then: { $arrayElemAt: ["$verbs", { $floor: { $multiply: [{ $rand: {} }, { $size: "$verbs" }] } }] },
                            else: null // If empty, return null
                        }
                    },
                    randomPrefix: {
                        $cond: {
                            if: { $gt: [{ $size: "$prefixes" }, 0] }, // Check if prefixes array is not empty
                            then: { $arrayElemAt: ["$prefixes", { $floor: { $multiply: [{ $rand: {} }, { $size: "$prefixes" }] } }] },
                            else: null // If empty, return null
                        }
                    },
                    randomAdjective: {
                        $cond: {
                            if: { $gt: [{ $size: "$adjectives" }, 0] }, // Check if adjectives array is not empty
                            then: { $arrayElemAt: ["$adjectives", { $floor: { $multiply: [{ $rand: {} }, { $size: "$adjectives" }] } }] },
                            else: null // If empty, return null
                        }
                    },
                    randomNoun: {
                        $cond: {
                            if: { $gt: [{ $size: "$nouns" }, 0] }, // Check if nouns array is not empty
                            then: { $arrayElemAt: ["$nouns", { $floor: { $multiply: [{ $rand: {} }, { $size: "$nouns" }] } }] },
                            else: null // If empty, return null
                        }
                    }
                }
            }
        ]);

        if (!randomWords || randomWords.length === 0) {
            res.status(404).json({ message: "Dataset not found or empty." });
            return;
        }

        const { randomVerb, randomPrefix, randomAdjective, randomNoun } = randomWords[0];

        const genPhrase = [
            randomVerb.word,
            "the",
            randomPrefix ? `${randomPrefix.word}-${randomAdjective.word || ""}` : randomAdjective.word,
            randomNoun.word
        ].filter(Boolean)
            .join(" ");

        res.status(200).json({ genPhrase })

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to generate phrase" });
    }
})


module.exports = router;
