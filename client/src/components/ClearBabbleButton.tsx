import { useDispatch } from "react-redux";
import { Button } from "@radix-ui/themes";
import { clearBabble } from "../redux/reducers/babbleReducer";

export const ClearBabbleButton: React.FC = () => {

    const dispatch = useDispatch();

    const resetBabbler = () => {
        dispatch(clearBabble());
    }
    return (
        <Button onClick={resetBabbler}>Clear Babble</Button>
    )
}