import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { Button } from "@radix-ui/themes";

//Actions
import { addBabbleLine } from "../redux/reducers/babbleReducer";

//Types
import { BabbleRootState } from "../Types/BabblerRootState";

interface GenerateBabbleButtonProps {
    title: string;
    size: "1" | "2" | "3" | undefined;
}

export const GenerateBabbleButton: React.FC<GenerateBabbleButtonProps> = ({ title, size }) => {

    const dispatch = useDispatch();
    const databases = useSelector((state: BabbleRootState) => state.database);

    // const handleGenerate = () => {
    //     axios.get('/api/generator/')
    //         .then((response) => {
    //             dispatch(addBabbleLine(response.data.genPhrase));
    //         }).catch((error) => {
    //             console.error(error);
    //         })
    // }

    const handleGenerateFrom = () => {
        axios.get('/api/generator/generateFrom', { params: { dbName: databases.selectedDatabase } })
            .then((response) => {
                dispatch(addBabbleLine(response.data.genPhrase));
            }).catch((error) => {
                console.error(error);
            })
    }


    return (
        <Button size={size} onClick={handleGenerateFrom}>{title}</Button>
    )
}