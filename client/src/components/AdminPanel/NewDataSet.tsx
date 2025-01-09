import { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";

//RadixUI
import { FilePlusIcon } from "@radix-ui/react-icons";
import { Button, TextField, Popover } from "@radix-ui/themes";

//Modules
import { getDatabaseNames } from "../../modules/getDatabaseNames";
import { BabbleCallout } from "../BabbleCallout";

//Actions
import { setAvilableDatabases } from "../../redux/reducers/databaseReducer";

export const NewDataSet: React.FC = () => {

    const [newDbName, setNewDbname] = useState('');
    const dispatch = useDispatch();
    const [isCalloutVisible, setIsCalloutVisible] = useState(false);
    const [calloutMessage, setCalloutMessage] = useState('');
    const [calloutColor, setCalloutColor] = useState('blue');

    const handleCreateDatabase = () => {
        if (newDbName === '') {
            return;
        } else {
            axios.post('/api/data/createDatabase', { name: newDbName })
                .then(() => {
                    setIsCalloutVisible(true);
                    setCalloutMessage(`${newDbName} created successfully`);
                    setNewDbname('');
                    getDatabaseNames()
                        .then((response) => {
                            dispatch(setAvilableDatabases(response));
                        });
                    setTimeout(() => setIsCalloutVisible(false), 3000);
                }).catch((error) => {
                    setCalloutColor('ruby');
                    setCalloutMessage(error.response.data.message || "Error creating new dataset");
                    setIsCalloutVisible(true);
                    console.error(error);
                    setTimeout(() => setIsCalloutVisible(false), 3000);
                })
        }
    }

    return (
        <div style={{
            display: 'flex',
            gap: '0.5rem'
        }}>
            <div>
                <Popover.Root>
                    <Popover.Trigger>
                        <Button variant="soft">
                            <FilePlusIcon />
                            New Dataset
                        </Button>
                    </Popover.Trigger>
                    <Popover.Content>
                        <TextField.Root variant="soft" size={"1"} value={newDbName} onChange={(e) => setNewDbname(e.target.value)}>
                            <TextField.Slot />
                        </TextField.Root>
                        <Popover.Close>
                            <Button size="1" onClick={handleCreateDatabase}>Create Dataset</Button>
                        </Popover.Close>
                    </Popover.Content>
                </Popover.Root>
            </div>

            <BabbleCallout message={calloutMessage} color={calloutColor} isVisible={isCalloutVisible} />

        </div>
    )
}