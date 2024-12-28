import { ObjectId, Document } from "mongoose";

export interface NounType extends Document {
    _id: ObjectId;
    noun: string;
    category?: CategoryType;
    acceptsUnits: boolean;
    plural?: boolean;
}

export type CategoryType =
    "science" | "trans" | "fantasy" | "none"

export interface VerbType extends Document {
    _id: ObjectId;
    verb: string;
    category?: CategoryType;
}

export interface AdjectiveType extends Document {
    _id: ObjectId;
    adjective: string;
    category?: CategoryType
}

export interface AdverbType extends Document {
    _id: ObjectId;
    adverb: string;
    category?: CategoryType
}
