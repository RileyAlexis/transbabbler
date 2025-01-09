import { useEffect, useState } from "react";
import axios from 'axios';
import { useSelector, useDispatch } from "react-redux";

//UI
import { IconButton, Table } from "@radix-ui/themes";
import { MinusCircledIcon, PlusCircledIcon } from "@radix-ui/react-icons";

//Modules
import { capitalize } from '../../modules/capitalize';
import { alphabetize } from '../../modules/alphabetize';
import { addOneWord } from "../../modules/addOneWord";
import { loadCollection } from "../../modules/loadCollection";

//Types
import { NounType, VerbType, AdjectiveType, PrefixType, SuffixType } from "../../Types/WordTypes";
import { Button } from "@radix-ui/themes/dist/cjs/index.js";
import { ModifyWord } from "./ModifyWord";
import { BabbleRootState } from "../../Types/BabblerRootState";

//Actions


interface CollectionsProps {
    collection: string;
}


export const Collections: React.FC<CollectionsProps> = ({ collection }) => {

    const database = useSelector((state: BabbleRootState) => state.database);
    const [allWords, setAllWords] = useState<NounType[] | VerbType[] | AdjectiveType[] | PrefixType[] | SuffixType[]>([]);
    const [loading, setLoading] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const [wordToAdd, setWordToAdd] = useState(`Add a Word to ${collection}`);
    const [error, setError] = useState<string>('');


    const handleLoadCollection = async () => {
        const response = await loadCollection(database.selectedDatabase, collection);
        setAllWords(response);
    }

    useEffect(() => {
        handleLoadCollection();
    }, [collection, database]);

    const handleAddWord = async (wordToAdd: string) => {
        if (wordToAdd !== '') {
            const response = await addOneWord(database.selectedDatabase, collection, wordToAdd)
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

    const handleModify = (id: string, originalWord: string, modifiedWord: string) => {
        console.log(modifiedWord);
        if (originalWord === modifiedWord || modifiedWord === '') {
            return;
        } else {
            setLoading(true);
            axios.post('/api/words/updateWord', { type: collection, id: id, word: modifiedWord })
                .then((response) => {
                    console.log(response.data.message);
                    handleLoadCollection();
                    setLoading(false);
                }).catch((error) => {
                    console.log('Error Updating Word', error);
                    setLoading(false);
                });
        }
    }

    return (
        <div>
            <Table.Root>
                <Table.Header>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'flex-start',
                        marginLeft: 15,
                        marginTop: 15,
                    }}>
                        <IconButton>
                            {!isAdding &&
                                <PlusCircledIcon onClick={() => setIsAdding(true)} />
                            }
                            {isAdding &&
                                <MinusCircledIcon onClick={() => setIsAdding(false)} />
                            }
                        </IconButton>
                    </div>
                    <Table.Row>
                        <Table.ColumnHeaderCell>{capitalize(collection)}</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Category</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Modify</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Delete</Table.ColumnHeaderCell>

                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {isAdding &&
                        <Table.Row>
                            <Table.RowHeaderCell>
                                <ModifyWord word={wordToAdd} loading={loading} onSubmit={(word: string) => handleAddWord(word)} />
                            </Table.RowHeaderCell>
                        </Table.Row>
                    }

                    {allWords.map((item, _id) => (
                        <Table.Row key={_id}>
                            <Table.RowHeaderCell>{item.word}</Table.RowHeaderCell>
                            <Table.Cell>{item.category}</Table.Cell>

                            <Table.Cell>
                                <ModifyWord word={item.word} loading={loading} onSubmit={(word: string) => handleModify(item._id.toString(), item.word, word)} />
                            </Table.Cell>
                            <Table.Cell><Button onClick={() => handleDeleteWord(item._id.toString())}>X</Button></Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>



            </Table.Root>
        </div>
    )
}