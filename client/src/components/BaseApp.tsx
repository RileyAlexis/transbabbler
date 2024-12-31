import { useState, useEffect } from "react";
import axios from "axios";
import { Button, TextField } from "@radix-ui/themes";

import { NounType } from "src/Types/WordTypes";

export const BaseApp = () => {

    const [noun, setNoun] = useState('');
    const [allNouns, setAllNouns] = useState<NounType[]>([]);
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
                setAllNouns(response.data);
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

            <div>
                {allNouns.length > 0 &&
                    allNouns.map((item) => (
                        <p key={item._id.toString()}>{item.noun} <a onClick={() => handleDeleteNoun(item._id.toString())} style={{
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