import { useEffect, useState } from "react";
import axios from "axios";
import { PlusIcon } from "@radix-ui/react-icons";
import { IconButton, TextField } from "@radix-ui/themes";

export const DbOptions: React.FC = () => {

    const [newDbName, setNewDbname] = useState('');

    const handleCreateDatabase = () => {
        if (newDbName === '') {
            return;
        } else {
            axios.post('/api/data/createDatabase', { name: newDbName })
                .then((response) => {
                    console.log(response.data.messsage);
                }).catch((error) => {
                    console.error(error.message);
                })
        }
    }

    return (
        <div style={{
            display: 'flex',
            gap: 10,
        }}>
            <TextField.Root placeholder="New DB Name" variant="soft" radius="small" value={newDbName} onChange={(e) => setNewDbname(e.target.value)}>
                <TextField.Slot />
            </TextField.Root>
            <IconButton onClick={handleCreateDatabase}>
                <PlusIcon />
            </IconButton>
        </div>
    )
}