import { useSelector, } from "react-redux";

import { Text } from "@radix-ui/themes";

//Types
import { BabbleRootState } from "src/Types/BabblerRootState";


export const GenerateBase: React.FC = () => {

    const babble = useSelector((state: BabbleRootState) => state.babble);

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