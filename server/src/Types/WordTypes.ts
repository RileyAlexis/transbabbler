
export interface NounType {
    noun: string;
    category?: CategoryType;
    acceptsUnits: boolean;
    plural?: boolean;
}

export type CategoryType =
    "science" | "trans" | "fantasy" | "none"

export interface VerbType {
    verb: string;
    category?: CategoryType;
}

export interface AdjectiveType {
    adjective: string;
    category?: CategoryType
}

export interface AdverbType {
    adverb: string;
    category?: CategoryType
}
