import mongoose, { Schema } from "mongoose";

//Types
import { NounType, VerbType, AdjectiveType, PrefixType, SuffixType } from "../types/WordTypes";


export type CategoryType =
    "science" | "trans" | "fantasy" | "none"

const NounSchema: Schema = new Schema({
    word: { type: String, required: true, unique: true },
    category: { type: String, required: false },
    acceptsUnits: { type: Boolean, required: false },
    plural: { type: Boolean, required: false },
},
    { timestamps: true }
);

const VerbSchema: Schema = new Schema({
    word: { type: String, requried: true, unique: true },
    category: { type: String, required: false }
},
    { timestamps: true }
);

const AdjectiveSchema: Schema = new Schema({
    word: { type: String, requried: true, unique: true },
    category: { type: String, required: false }
},
    { timestamps: true }
);

const PrefixSchema: Schema = new Schema({
    word: { type: String, requried: true, unique: true },
    category: { type: String, required: false }
},
    { timestamps: true }
);

const SuffixSchema: Schema = new Schema({
    word: { type: String, requried: true, unique: true },
    category: { type: String, required: false }
},
    { timestamps: true }
);


const DatabaseSchema: Schema = new Schema({
    name: { type: String, required: true, unique: true },
    nouns: [NounSchema],
    verbs: [VerbSchema],
    adjectives: [AdjectiveSchema],
    prefixes: [PrefixSchema],
    suffixes: [SuffixSchema],
},
    { timestamps: true }
);


export const NounCollection = mongoose.model<NounType>("NounCollection", NounSchema);
export const VerbCollection = mongoose.model<VerbType>("VerbCollection", VerbSchema);
export const AdjectiveCollection = mongoose.model<AdjectiveType>("AdjectiveCollection", AdjectiveSchema);
export const PrefixCollection = mongoose.model<PrefixType>("PrefixCollection", PrefixSchema);
export const SuffixCollection = mongoose.model<SuffixType>("SuffixCollection", SuffixSchema);
export const DatabaseCollection = mongoose.model("Database", DatabaseSchema);