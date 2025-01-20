import { ObjectId, Document } from "mongoose";

export interface NounType extends Document {
    _id: ObjectId;
    word: string;
    category?: CategoryType;
    acceptsUnits: boolean;
    plural?: boolean;
}

export type CategoryType =
    "science" | "trans" | "fantasy" | "none"

export interface VerbType extends Document {
    _id: ObjectId;
    word: string;
    category?: CategoryType;
}

export interface AdjectiveType extends Document {
    _id: ObjectId;
    word: string;
    category?: CategoryType
}

export interface PrefixType extends Document {
    _id: ObjectId;
    word: string;
    category?: CategoryType
}

export interface SuffixType extends Document {
    _id: ObjectId;
    word: string;
    category?: CategoryType
}
