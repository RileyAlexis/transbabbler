import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

//Radix UI
import { Text } from "@radix-ui/themes";

//Actions
import { addPhrase, removePhrase } from "../redux/reducers/userReducer";

//Types
import { BabbleRootState } from "../Types/BabblerRootState";


export const GenerateBase: React.FC = () => {

    const babble = useSelector((state: BabbleRootState) => state.babble);
    const user = useSelector((state: BabbleRootState) => state.user);
    const dispatch = useDispatch();

    const addPhraseToUser = (phrase: string) => {
        if (!user.username) return;

        if (user.phrases?.includes(phrase)) {
            dispatch(removePhrase(phrase));

            axios.post('/api/users/removePhrase', { phrase }, { withCredentials: true })
                .then(() => {
                }).catch((error) => {
                    console.log(error);
                });
        } else {
            dispatch(addPhrase(phrase));

            axios.post('/api/users/addPhrase', { phrase }, { withCredentials: true })
                .then(() => {
                }).catch((error) => {
                    console.log(error);
                });

        }
    }

    return (
        <div className="babblerContainer">
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
                            <span className="babblerLines" key={index}
                                style={{
                                    backgroundColor: user.phrases?.includes(line) ? 'rgba(48 160 0 / 0.66)' : 'transparent',
                                }}
                            >
                                <a onClick={() => addPhraseToUser(line)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    {line}
                                </a>
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