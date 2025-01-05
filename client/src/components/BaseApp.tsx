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
        if (wordToAdd !== '' && wordType) {
            axios.post(`/api/words/AddOneWord`, { word: wordToAdd, type: wordType }, { withCredentials: true })
                .then((response) => {
                    console.log(response.data.message);
                    setWordToAdd('');
                    handleLoadCollection();
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
            <div>
                <Select.Root required onValueChange={(value) => setCollection(value)}>
                    <Select.Trigger placeholder="Collection to Load" variant="soft" />
                    <Select.Content>
                        <Select.Group>
                            <Select.Label>Word Type</Select.Label>
                            <Select.Item value="nouns">Noun</Select.Item>
                            <Select.Item value="verbs">Verb</Select.Item>
                            <Select.Item value="adjectives">Adjective</Select.Item>
                            <Select.Item value="prefixes">Prefix</Select.Item>
                            <Select.Item value="suffixes">Suffix</Select.Item>

                        </Select.Group>

                    </Select.Content>
                </Select.Root>
                <Button onClick={handleLoadCollection}>Load Collection</Button>
            </div>

            <div style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                margin: 10,
                borderWidth: 2,
                borderColor: 'white',
            }}>
                <Heading weight="bold" align="center" as="h6">Add One Word of any Type</Heading>
                <Select.Root required onValueChange={(value) => setWordType(value)}>
                    <Select.Trigger placeholder="Choose Word Type" variant="soft" />
                    <Select.Content>
                        <Select.Group>
                            <Select.Label>Word Type</Select.Label>
                            <Select.Item value="noun">Noun</Select.Item>
                            <Select.Item value="verb">Verb</Select.Item>
                            <Select.Item value="adjective">Adjective</Select.Item>
                            <Select.Item value="prefix">Prefix</Select.Item>
                            <Select.Item value="suffix">Suffix</Select.Item>

                        </Select.Group>
                    </Select.Content>
                </Select.Root>
                <TextField.Root placeholder="Enter a Word" variant="soft" radius="small" value={wordToAdd} onChange={(e) => setWordToAdd(e.target.value)}>
                    <TextField.Slot />
                </TextField.Root>
                <Button onClick={handleAddWord}>Add New Word</Button>


            </div>

            <div>
                {allWords.length > 0 &&
                    allWords.map((item) => (
                        <p key={item._id.toString()}>{item.word} <a onClick={() => handleDeleteWord(item._id.toString())} style={{
                            cursor: 'pointer',
                            color: 'red',
                            marginLeft: 15
                        }}>X</a>
                        </p>
                    ))
                }
            </div>
        </div>
    )
}