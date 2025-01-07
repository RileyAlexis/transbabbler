import { useEffect, useState } from "react";
import axios from 'axios';

//UI
import { Table, TextField } from "@radix-ui/themes";

//Modules
import { capitalize } from '../../modules/capitalize';
import { alphabetize } from '../../modules/alphabetize';

//Types
import { NounType, VerbType, AdjectiveType, PrefixType, SuffixType } from "src/Types/WordTypes";
import { Button } from "@radix-ui/themes/dist/cjs/index.js";

interface CollectionsProps {
    collection: string;
}


export const Collections: React.FC<CollectionsProps> = ({ collection }) => {

    const [allWords, setAllWords] = useState<NounType[] | VerbType[] | AdjectiveType[] | PrefixType[] | SuffixType[]>([]);
    const [error, setError] = useState<string>('');


    const handleLoadCollection = () => {
        if (collection) {
            axios.get(`api/words/loadCollection/${collection}`)
                .then((response) => {
                    setAllWords(alphabetize(response.data));
                }).catch((error) => {
                    console.error(error);
                })
        } else {
            setError('Must select Collection to load');
        }
    }

    useEffect(() => {
        handleLoadCollection();
    }, [collection]);

    const handleAddWord = (wordToAdd: string, wordType: string) => {
        if (wordToAdd !== '' && wordType) {
            axios.post(`/api/words/AddOneWord`, { word: wordToAdd, type: wordType }, { withCredentials: true })
                .then((response) => {
                    console.log(response.data.message);
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
            <Table.Root>
                <Table.Header>
                    <Table.Row>
                        <Table.ColumnHeaderCell>{capitalize(collection)}</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Category</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Modify</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Delete</Table.ColumnHeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {allWords.map((item, _id) => (
                        <Table.Row key={_id}>
                            <Table.RowHeaderCell>{item.word}</Table.RowHeaderCell>
                            <Table.Cell>{item.category}</Table.Cell>

                            <Table.Cell style={{
                                width: '200px'
                            }}>
                                <TextField.Root placeholder="Modify Word" variant="soft" radius="small" value={item.word}
                                // onChange={(e) => setWordToAdd(e.target.value)}>
                                >
                                    <TextField.Slot />

                                </TextField.Root>
                            </Table.Cell>
                            <Table.Cell><Button onClick={() => handleDeleteWord(item._id.toString())}>X</Button></Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>



            </Table.Root>
        </div>
    )
}