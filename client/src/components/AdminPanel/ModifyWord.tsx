import { useState } from "react";
import { TextField, IconButton } from "@radix-ui/themes";
import { UploadIcon } from "@radix-ui/react-icons";

interface ModifyWordProps {
    word: string;
    loading: boolean;
    onSubmit: (word: string) => void
}


export const ModifyWord: React.FC<ModifyWordProps> = ({ word, loading, onSubmit }) => {

    const [wordToModify, setWordToModify] = useState('');

    return (
        <div style={{
            display: 'flex',
        }}>
            <TextField.Root placeholder={word} variant="soft" radius="small" value={wordToModify}
                onChange={(e) => setWordToModify(e.target.value)}>

                <TextField.Slot />

            </TextField.Root>
            <IconButton loading={loading} onClick={() => onSubmit(wordToModify)}>
                <UploadIcon />
            </IconButton>
        </div>
    )
}