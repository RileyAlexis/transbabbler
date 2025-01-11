import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { Button } from "@radix-ui/themes";

//Actions
import { addBabbleLine } from "../redux/reducers/babbleReducer";

//Types
import { BabbleRootState } from "../Types/BabblerRootState";

export const GenerateBabbleButton: React.FC = () => {

    const dispatch = useDispatch();
    const databases = useSelector((state: BabbleRootState) => state.database);

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


    return (
        <Button onClick={handleGenerateFrom}>Generate Babble</Button>
    )
}