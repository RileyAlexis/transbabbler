import { ObjectId } from "mongodb";

export interface NounType {
    _id: ObjectId;
    noun: string;
    category?: CategoryType;
    acceptsUnits: boolean;
    plural?: boolean;
}

export type CategoryType =
    "science" | "trans" | "fantasy" | "none"

export interface VerbType {
    _id: ObjectId;
    verb: string;
    category?: CategoryType;
}

export interface AdjectiveType {
    _id: ObjectId;
    adjective: string;
    category?: CategoryType
}

export interface AdverbType {
    _id: ObjectId;
    adverb: string;
    category?: CategoryType
}
