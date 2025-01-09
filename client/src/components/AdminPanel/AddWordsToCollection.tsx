import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//RadixUI
import { PlusIcon } from "@radix-ui/react-icons";
import { Button, Popover, TextArea, Text, Badge } from "@radix-ui/themes";

//Modules
import { stringToArray } from "../../modules/stringToArray";
import { addManyWords } from "../../modules/addManyWords";
import { loadCollection } from "../../modules/loadCollection";
import { BabbleCallout } from "../BabbleCallout";


interface AddWordsToCollectionProps {
    database: string;
    collection: string;
    setAllWords: React.Dispatch<React.SetStateAction<string[]>>;
}


export const AddWordsToCollection: React.FC<AddWordsToCollectionProps> = ({ database, collection, setAllWords }) => {

    const [textData, setTextData] = useState('');
    const [isCalloutVisible, setIsCalloutVisible] = useState(false);
    const [calloutMessage, setCalloutMessage] = useState('');
    const [calloutColor, setCalloutColor] = useState('blue');

    const handleAddWords = async () => {
        const result = stringToArray(textData);

        addManyWords(database, collection, result).then((response) => {
            setTextData('');
            loadCollection(database, collection)
                .then((response) => {
                    console.log(response);
                    setAllWords(response.data);
                }).catch((error) => {
                    console.error(error);
                })
            setCalloutMessage(response.data.message);
            setIsCalloutVisible(true);
            setCalloutColor('blue');

            setTimeout(() => setIsCalloutVisible(false), 3000);
        }).catch((error) => {
            setCalloutColor('ruby');
            setCalloutMessage(error.response.data.message || "Error adding words to database");
            setIsCalloutVisible(true);
            console.error(error);
            setTimeout(() => setIsCalloutVisible(false), 3000);
        })
    }

    return (
        <div>
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
            <div>
                <BabbleCallout message={calloutMessage} color={calloutColor} isVisible={isCalloutVisible} />
            </div>
        </div>
    )
}