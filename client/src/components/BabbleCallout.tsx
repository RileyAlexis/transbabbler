import { InfoCircledIcon } from "@radix-ui/react-icons";
import { Callout } from "@radix-ui/themes";

interface BabbleCalloutProps {
    message: string;
    color: any;
    isVisible: boolean;
}

export const BabbleCallout: React.FC<BabbleCalloutProps> = ({ message, color, isVisible }) => {
    return (
        <>
            {isVisible &&
                <div style={{
                    position: 'fixed',
                    right: '2%',
                    bottom: '4%',
                    // width: 250,
                }}>
                    <Callout.Root style={{
                        display: 'flex',
                        justifyContent: 'flex-start',
                        backgroundColor: color,
                    }} size="1" variant="soft" color={color}>
                        <Callout.Icon>
                            <InfoCircledIcon />
                        </Callout.Icon>
                        <Callout.Text>
                            {message}
                        </Callout.Text>
                    </Callout.Root>
                </div>
            }
        </>
    )
}