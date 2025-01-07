import { NounType, VerbType, AdjectiveType, PrefixType, SuffixType } from "src/Types/WordTypes";

type Item = NounType[] | VerbType[] | AdjectiveType[] | PrefixType[] | SuffixType[]

export function alphabetize(items: Item): Item {
    return items.sort((a, b) => a.word.localeCompare(b.word));
}