import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";

//RadixUI
import { FilePlusIcon, PlusIcon } from "@radix-ui/react-icons";
import { Button, IconButton, TextArea, TextField } from "@radix-ui/themes";
import { Popover } from "@radix-ui/themes";

//Modules
import { getDatabaseNames } from "../../modules/getDatabaseNames";

//Actions
import { setAvilableDatabases } from "../../redux/reducers/databaseReducer";


export const DbOptions: React.FC = () => {

    const [newDbName, setNewDbname] = useState('');
    const dispatch = useDispatch();

    const handleCreateDatabase = () => {
        if (newDbName === '') {
            return;
        } else {
            axios.post('/api/data/createDatabase', { name: newDbName })
                .then((response) => {
                    console.log(response.data);
                    setNewDbname('');
                    getDatabaseNames()
                        .then((response) => {
                            dispatch(setAvilableDatabases(response));
                        })
                }).catch((error) => {
                    console.error(error.message);
                })
        }
    }

    return (
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
    )
}