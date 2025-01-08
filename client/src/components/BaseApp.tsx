import { useState } from "react";
import axios from "axios";
import { Text, Button, TextField } from "@radix-ui/themes";

import { NounType, VerbType, AdjectiveType, PrefixType, SuffixType } from "src/Types/WordTypes";
import { ModifyWord } from "./AdminPanel/ModifyWord";

export const BaseApp = () => {

    const [allWords, setAllWords] = useState<NounType[] | []>([]);
    const [collection, setCollection] = useState<string | undefined>();
    const [wordToAdd, setWordToAdd] = useState<string>('');
    const [wordType, setWordType] = useState<string | undefined>();
    const [error, setError] = useState('');

    const handleLoadCollection = () => {

        axios.get(`/api/words/loadCollection`, { params: { databaseName: "Cats", type: "nouns" } })
            .then((response) => {
                console.log(response.data);
                console.log(typeof response.data);
                setAllWords(response.data);
            }).catch((error) => {
                console.error(error);
            })

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

    const handleDeleteWord = (wordToDelete: string) => {
        axios.delete(`/api/words/deleteWord/`, { data: { databaseName: "Cats", type: "nouns", word: wordToDelete } })
            .then((response) => {
                console.log(response.data.message);
                handleLoadCollection();
            }).catch((error) => {
                console.error(error);
            })
    }

    const handleModify = (originalWord: string, modifiedWord: string) => {
        console.log(modifiedWord);
        if (originalWord === modifiedWord || modifiedWord === '') {
            return;
        } else {
            axios.post('/api/words/updateWord', { databaseName: "Cats", type: "nouns", word: originalWord, newWord: modifiedWord, category: "none" })
                .then((response) => {
                    console.log(response.data.message);
                    handleLoadCollection();
                }).catch((error) => {
                    console.log('Error Updating Word', error);
                });
        }
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
            <div>
                <Button variant="soft" onClick={handleLoadCollection}>Load Nouns</Button>
                {allWords.length > 0 &&
                    allWords.map((item, index) => (
                        <div>
                            <Text key={index} as="span"> {item.word} |</Text>
                            <Button variant="soft" onClick={() => handleDeleteWord(item.word)}>X</Button>
                        </div>
                    ))}
            </div>

            <div>
                {allWords.length > 0 &&
                    allWords.map((item, index) => (
                        <ModifyWord word={item.word} loading={false} onSubmit={(word: string) => handleModify(item.word, word)} />
                    ))
                }

            </div>


        </div>
    )
}