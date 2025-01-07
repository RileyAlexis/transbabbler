import { useEffect, useState } from "react";
import axios from 'axios';

import { NounType, VerbType, AdjectiveType, PrefixType, SuffixType } from "src/Types/WordTypes";

interface CollectionsProps {
    collection: string | undefined
}


export const Collections: React.FC<CollectionsProps> = ({ collection }) => {

    const [allWords, setAllWords] = useState<NounType[] | VerbType[] | AdjectiveType[] | PrefixType[] | SuffixType[]>([]);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        const handleLoadCollection = () => {
            if (collection) {
                axios.get(`api/words/loadCollection/${collection}`)
                    .then((response) => {
                        setAllWords(response.data);
                    }).catch((error) => {
                        console.error(error);
                    })
            } else {
                setError('Must select Collection to load');
            }
        }

        handleLoadCollection();
    }, [collection])


    return (
        <div>
            {allWords.map((item, index) => (
                <p key={index}>{item.word}</p>
            ))}
        </div>
    )
}