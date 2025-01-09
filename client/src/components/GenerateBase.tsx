import { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

import { Button, Text } from "@radix-ui/themes";

//Components
import { DataSetSelector } from "./DataSetSelector";

//Types
import { BabbleRootState } from "src/Types/BabblerRootState";

export const GenerateBase: React.FC = () => {

    const [genPhrase, setGenPhrase] = useState<string[]>([]);
    const databases = useSelector((state: BabbleRootState) => state.database);

    const handleGenerate = () => {
        axios.get('/api/generator/')
            .then((response) => {
                setGenPhrase((prev) => [...prev, response.data]);
            }).catch((error) => {
                console.error(error);
            })
    }

    const handleGenerateFrom = () => {
        axios.get('/api/generator/generateFrom', { params: { dbName: databases.selectedDatabase } })
            .then((response) => {
                console.log(response);
                setGenPhrase((prev) => [...prev, response.data.genPhrase]);
            }).catch((error) => {
                console.error(error);
            })
    }

    const resetBabbler = () => {
        setGenPhrase([]);
    }


    return (
        <div className="babblerContainer">
            <DataSetSelector />
            <div className="babblerContainerButtons">
                <Button style={{ marginRight: 15 }} onClick={handleGenerateFrom}>Generate Babble</Button>
                <Button onClick={resetBabbler}>Clear Babble</Button>
            </div>
            <div className="babblerContainerBabbles">


                <Text
                    style={{
                        marginRight: '0.3rem',
                        marginLeft: '0.3rem',
                    }}
                    weight="medium"
                    as="p"
                >
                    {genPhrase.length > 0 &&
                        genPhrase.map((line, index) => (
                            <span className="babblerLines" key={index}>
                                {line}
                                {
                                    genPhrase.length > 1 &&
                                    <Text color="pink" size="6" as="span" style={{ marginLeft: '0.2rem' }}>|</Text>
                                }
                            </span>
                        ))
                    }
                </Text>




            </div>
        </div>
    );
}