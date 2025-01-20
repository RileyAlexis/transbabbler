import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

//Actions
import { removePhrase } from "../redux/reducers/userReducer";

//Types
import { BabbleRootState } from "../Types/BabblerRootState";
import { Button } from "@radix-ui/themes";

export const UserSavedPhrases: React.FC = () => {

    const user = useSelector((state: BabbleRootState) => state.user);
    const dispatch = useDispatch();

    const handleRemovePhrase = (phrase: string) => {
        axios.post('/api/users/removePhrase', { phrase }, { withCredentials: true })
            .then((response) => {
                console.log(response);
                dispatch(removePhrase(phrase));
            }).catch((error) => {
                console.log(error);
            });
    }


    return (
        <div className="babblerContainer">
            <div className="savedPhrasesContainer">
                {user.phrases && user.phrases.length > 0 &&
                    user.phrases?.map((line, index) => (
                        <div className="savedbabbleSubContainer" key={index}>
                            <div className="savedbabblerLine">
                                {line}
                            </div>

                            <Button
                                onClick={() => handleRemovePhrase(line)}
                                style={{
                                    marginLeft: '0.3rem',
                                    marginRight: '0.3rem',
                                }}
                                variant="ghost">X</Button>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}