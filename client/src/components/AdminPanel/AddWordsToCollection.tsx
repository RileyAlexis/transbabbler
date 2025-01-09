import { useState } from "react"

//RadixUI
import { PlusIcon } from "@radix-ui/react-icons";
import { Button, Popover, TextArea, Text, Badge } from "@radix-ui/themes";

//Modules
import { stringToArray } from "../../modules/stringToArray";
import { addManyWords } from "../../modules/addManyWords";

interface AddWordsToCollectionProps {
    database: string;
    collection: string;
}


export const AddWordsToCollection: React.FC<AddWordsToCollectionProps> = ({ database, collection }) => {
    const [textData, setTextData] = useState('');

    const handleAddWords = async () => {
        const result = stringToArray(textData);

        addManyWords(database, collection, result).then((response) => {
            setTextData('');
            console.log(response);
        }).catch((error) => {
            console.error(error);
        })
    }


    return (
        <Popover.Root>
            <Popover.Trigger>
                <Button variant="soft">
                    <PlusIcon />
                </Button>
            </Popover.Trigger>
            <Popover.Content>
                <div>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-around',
                        gap: 10,
                        marginBottom: '0.5rem'
                    }}>
                        <Text size="1">Add Words</Text>
                        <Badge>{collection}</Badge>
                    </div>
                    <TextArea placeholder="Separate by line or commas" value={textData} onChange={(e) => setTextData(e.target.value)} />
                </div>
                <Popover.Close>
                    <Button style={{ marginTop: '0.5rem' }} size="1" onClick={handleAddWords}>Submit</Button>
                </Popover.Close>
            </Popover.Content>
        </Popover.Root>
    )
}