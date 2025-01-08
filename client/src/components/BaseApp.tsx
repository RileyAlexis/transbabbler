import { useState } from "react";
import axios from "axios";
import { Button, TextField } from "@radix-ui/themes";

import { NounType, VerbType, AdjectiveType, PrefixType, SuffixType } from "src/Types/WordTypes";
import { Heading } from "@radix-ui/themes/dist/cjs/index.js";
import { Select } from "@radix-ui/themes";

export const BaseApp = () => {

    const [allWords, setAllWords] = useState<NounType[] | VerbType[] | AdjectiveType[] | PrefixType[] | SuffixType[]>([]);
    const [collection, setCollection] = useState<string | undefined>();
    const [wordToAdd, setWordToAdd] = useState<string>('');
    const [wordType, setWordType] = useState<string | undefined>();
    const [error, setError] = useState('');

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

    const handleAddWord = () => {
        if (wordToAdd !== '') {
            axios.post(`/api/words/addOneWord`, { word: wordToAdd, type: "nouns", databaseName: "Cats" }, { withCredentials: true })
                .then((response) => {
                    console.log(response.data.message);
                    setWordToAdd('');
                }).catch((error) => {
                    console.error(error);
                })
        }
    }

    const handleDeleteWord = (id: string) => {
        axios.delete(`/api/words/deleteWord/${id}/${collection}`)
            .then((response) => {
                console.log(response.data.message);
                handleLoadCollection();
            }).catch((error) => {
                console.error(error);
            })
    }

    return (
        <div>
            {error !== '' &&
                <p>{error}</p>
            }
            <div style={{ display: 'flex', gap: 10 }}>
                <TextField.Root placeholder="Add One Noun" value={wordToAdd} onChange={(e) => setWordToAdd(e.target.value)} variant="soft">
                    <TextField.Slot />
                </TextField.Root>
                <Button variant="soft" onClick={handleAddWord}>Add</Button>
            </div>


        </div>
    )
}