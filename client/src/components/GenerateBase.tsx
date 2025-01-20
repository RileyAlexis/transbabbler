import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { Text } from "@radix-ui/themes";

//Actions
import { addPhrase } from "../redux/reducers/userReducer";

//Types
import { BabbleRootState } from "../Types/BabblerRootState";


export const GenerateBase: React.FC = () => {

    const babble = useSelector((state: BabbleRootState) => state.babble);
    const dispatch = useDispatch();

    const addPhraseToUser = (phrase: string) => {
        dispatch(addPhrase(phrase));

        axios.post('/api/users/addPhrase', { phrase }, { withCredentials: true })
            .then((response) => {
                console.log(response);
            }).catch((error) => {
                console.log(error);
            })
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
                            <span className="babblerLines" key={index}>
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