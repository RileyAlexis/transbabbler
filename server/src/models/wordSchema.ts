import mongoose, { Schema } from "mongoose";

//Types
import { NounType, VerbType, AdjectiveType, AdverbType } from "../Types/WordTypes";


export type CategoryType =
    "science" | "trans" | "fantasy" | "none"

const NounSchema: Schema = new Schema({
    noun: { type: String, required: true },
    category: { type: String, required: false },
    acceptsUnits: { type: Boolean, required: false },
    plural: { type: Boolean, required: false },
},
    { timestamps: true }
);

const VerbSchema: Schema = new Schema({
    verb: { type: String, requried: true },
    category: { type: String, required: false }
},
    { timestamps: true }
);

const AdjectiveSchema: Schema = new Schema({
    adjective: { type: String, requried: true },
    category: { type: String, required: false }
},
    { timestamps: true }
);

const AdverbSchema: Schema = new Schema({
    adverb: { type: String, requried: true },
    category: { type: String, required: false }
},
    { timestamps: true }
);

export const NounCollection = mongoose.model<NounType>("NounCollection", NounSchema);
export const VerbCollection = mongoose.model<VerbType>("VerbCollection", VerbSchema);
export const AdjectiveCollection = mongoose.model<AdjectiveType>("AdjectiveCollection", AdjectiveSchema);
export const AdverbCollection = mongoose.model<AdverbType>("AdverbCollection", AdverbSchema);