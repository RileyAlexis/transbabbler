import { useState, useEffect } from "react";
import axios from "axios";
import { Button, TextField } from "@radix-ui/themes";

import { NounType, VerbType, AdjectiveType, PrefixType, SuffixType } from "src/Types/WordTypes";
import { Heading } from "@radix-ui/themes/dist/cjs/index.js";
import { Select } from "@radix-ui/themes";

export const BaseApp = () => {

    const [noun, setNoun] = useState('');
    const [allWords, setAllWords] = useState<NounType[] | VerbType[] | AdjectiveType[] | PrefixType[] | SuffixType[]>([]);
    const [wordToAdd, setWordToAdd] = useState<string>('');
    const [wordType, setWordType] = useState<string | undefined>();
    const [error, setError] = useState('');

    useEffect(() => {
        axios.get('/api')
            .then((response) => {
                console.log(response);
            }).catch((error) => {
                console.error(error);
            })
    }, []);

    const handleGetNouns = () => {
        axios.get('/api/words/loadNouns')
            .then((response) => {
                setAllWords(response.data);
            }).catch((error) => {
                console.error("Error fetching nouns", error);
            })
    }

    const handleAddNoun = () => {
        axios.post('/api/words/AddOneNoun', { noun })
            .then((response) => {
                console.log(response);
                setNoun('');
                handleGetNouns();
            }).catch((error) => {
                console.log("Error adding noun", error);
                setError(error.response.data.message);

            })
    }

    const handleDeleteNoun = (id: string) => {
        axios.delete(`/api/words/deleteOneNoun/${id}`,)
            .then(() => {
                handleGetNouns();
            }).catch((error) => {
                console.error(error);
            })
    }

    const handleAddWord = () => {
        if (wordToAdd !== '' && wordType) {
            axios.post(`/api/words/AddOneWord`, { word: wordToAdd, type: wordType }, { withCredentials: true })
                .then((response) => {
                    console.log(response.data.message);
                    setWordToAdd('');
                    setWordType(undefined);
                }).catch((error) => {
                    console.error(error);
                })
        }
    }

    return (
        <div>
            {error !== '' &&
                <p>{error}</p>
            }
            <div>
                <TextField.Root placeholder="Enter a noun" variant="soft" radius="large" value={noun} onChange={(e) => setNoun(e.target.value)}>
                    <TextField.Slot />
                </TextField.Root>
                <Button onClick={handleAddNoun}>Add Noun</Button>
                <Button onClick={handleGetNouns}>Load All Nouns</Button>
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
                        <p key={item._id.toString()}>{item.word} <a onClick={() => handleDeleteNoun(item._id.toString())} style={{
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