import { useDispatch } from "react-redux";
import { Button } from "@radix-ui/themes";
import { clearBabble } from "../redux/reducers/babbleReducer";

interface ClearBabbleButtonProps {
    size: "1" | "2" | "3" | undefined;
    title?: string;
}

export const ClearBabbleButton: React.FC<ClearBabbleButtonProps> = ({ size, title }) => {

    const dispatch = useDispatch();

    const resetBabbler = () => {
        dispatch(clearBabble());
    }
    return (
        <Button size={size} onClick={resetBabbler}>{title !== undefined ? title : 'Clear Babble'}</Button>
    )
}