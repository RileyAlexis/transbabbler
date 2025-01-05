import { useState } from "react";
import axios from "axios";
import { Button, Text } from "@radix-ui/themes";

export const GenerateBase: React.FC = () => {

    const [genPhrase, setGenPhrase] = useState<string[]>([]);

    const handleGenerate = () => {
        axios.get('/api/generator/')
            .then((response) => {
                setGenPhrase((prev) => [...prev, response.data]);
            }).catch((error) => {
                console.error(error);
            })
    }


    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexWrap: 'wrap',
                overflowY: 'scroll',
                height: 250,
                width: 550,
            }}
        >
            <Button onClick={handleGenerate}>Generate</Button>
            <div>
                {genPhrase.length > 0 &&
                    genPhrase.map((line, index) => (
                        <div key={index}>
                            <Text
                                style={{
                                    margin: 5
                                }}
                                weight="bold"
                                align="center"
                                wrap="nowrap"
                            >
                                {line}
                            </Text>
                        </div>
                    ))
                }

            </div>
        </div>
    );
}