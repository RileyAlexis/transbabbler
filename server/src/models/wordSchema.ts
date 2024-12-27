import mongoose, { Document, Schema } from "mongoose";

//Types
import { NounType, VerbType, AdjectiveType, AdverbType } from '../../../Types/WordTypes';

export interface NounWordType extends NounType, Document { }
export interface VerbWordType extends VerbType, Document { }
export interface AdjectiveWordType extends AdjectiveType, Document { }
export interface AdverbWordType extends AdverbType, Document { }

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

export const NounCollection = mongoose.model<NounWordType>("NounCollection", NounSchema);
export const VerbCollection = mongoose.model<VerbWordType>("VerbCollection", VerbSchema);
export const AdjectiveCollection = mongoose.model<AdjectiveWordType>("AdjectiveCollection", AdjectiveSchema);
export const AdverbCollection = mongoose.model<AdverbWordType>("AdbvebCollection", AdverbSchema);