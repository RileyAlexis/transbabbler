import { useSelector, useDispatch } from "react-redux";

//Actions
import { removePhrase } from "../redux/reducers/userReducer";

//Types
import { BabbleRootState } from "../Types/BabblerRootState";
import { Button } from "@radix-ui/themes";

export const UserSavedPhrases: React.FC = () => {

    const user = useSelector((state: BabbleRootState) => state.user);

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