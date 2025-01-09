import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

//UI
import { Table } from "@radix-ui/themes";

//Modules
import { capitalize } from '../../modules/capitalize';
import { deleteWord } from "../../modules/deleteWord";
import { updateWord } from "../../modules/updateWord";
import { loadCollection } from "../../modules/loadCollection";

//Components
import { ModifyWord } from "./ModifyWord";
import { BabbleCallout } from "../BabbleCallout";

//Types
import { Button } from "@radix-ui/themes/dist/cjs/index.js";
import { BabbleRootState } from "../../Types/BabblerRootState";

interface CollectionsProps {
    collection: string;
    allWords: any[];
    setAllWords: React.Dispatch<React.SetStateAction<string[]>>;
}


export const Collections: React.FC<CollectionsProps> = ({ collection, allWords, setAllWords }) => {

    const database = useSelector((state: BabbleRootState) => state.database);
    const [loading, setLoading] = useState(false);
    const [isCalloutVisible, setIsCalloutVisible] = useState(false);
    const [calloutMessage, setCalloutMessage] = useState('');
    const [calloutColor, setCalloutColor] = useState('blue');


    const handleLoadCollection = async () => {
        const response = await loadCollection(database.selectedDatabase, collection);
        setAllWords(response.data);
    }

    useEffect(() => {
        handleLoadCollection();
    }, [collection, database]);


    const handleDeleteWord = async (word: string) => {
        await deleteWord(database.selectedDatabase, collection, word);
        setIsCalloutVisible(true);
        setCalloutMessage(`${word} deleted from ${collection}`);

        setTimeout(() => setIsCalloutVisible(false), 3000);
        handleLoadCollection();
    }

    const handleModify = async (originalWord: string, modifiedWord: string) => {
        if (originalWord === modifiedWord || modifiedWord === '') {
            return;
        } else {
            await updateWord(database.selectedDatabase, collection, modifiedWord, originalWord);
            handleLoadCollection();
        }
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

                            <Table.Cell>
                                <ModifyWord word={item.word} loading={loading} onSubmit={(word: string) => handleModify(item.word, word)} />
                            </Table.Cell>
                            <Table.Cell><Button onClick={() => handleDeleteWord(item.word)}>X</Button></Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table.Root>
            <BabbleCallout message={calloutMessage} color={calloutColor} isVisible={isCalloutVisible} />
        </div>
    )
}