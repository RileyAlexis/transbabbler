import { useSelector, useDispatch } from "react-redux";

//Actions
import { removePhrase } from "../redux/reducers/userReducer";

//Types
import { BabbleRootState } from "../Types/BabblerRootState";

export const UserSavedPhrases: React.FC = () => {

    const user = useSelector((state: BabbleRootState) => state.user);

    return (
        <div className="babblerContainer">
            <div className="babblerContainerBabbles">
                {user.phrases && user.phrases.length > 0 &&
                    user.phrases?.map((line, index) => (
                        <div className="babblerLines" key={index}>
                            <a style={{ cursor: 'pointer' }}>
                                {line}
                            </a>
                            <a onClick={() => removePhrase(index)}
                                style={{ cursor: 'pointer' }}
                            >
                                <span style={{ marginLeft: '0.5rem' }}>🗑️</span>
                            </a>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}