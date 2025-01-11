import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

import { Button, Text } from "@radix-ui/themes";

//Types
import { BabbleRootState } from "src/Types/BabblerRootState";

//Actions
import { addBabbleLine, clearBabble } from "../redux/reducers/babbleReducer";

export const GenerateBase: React.FC = () => {

    const dispatch = useDispatch();
    const databases = useSelector((state: BabbleRootState) => state.database);
    const babble = useSelector((state: BabbleRootState) => state.babble);

    const handleGenerate = () => {
        axios.get('/api/generator/')
            .then((response) => {
                dispatch(addBabbleLine(response.data.genPhrase));
            }).catch((error) => {
                console.error(error);
            })
    }

    const handleGenerateFrom = () => {
        axios.get('/api/generator/generateFrom', { params: { dbName: databases.selectedDatabase } })
            .then((response) => {
                console.log(response);
                dispatch(addBabbleLine(response.data.genPhrase));
            }).catch((error) => {
                console.error(error);
            })
    }

    const resetBabbler = () => {
        dispatch(clearBabble());
    }


    return (
        <div className="babblerContainer">
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
                    {babble.length > 0 &&
                        babble.map((line, index) => (
                            <span className="babblerLines" key={index}>
                                {line}
                                {
                                    babble.length > 1 &&
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