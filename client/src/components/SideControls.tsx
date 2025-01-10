
//RadixUI
import { Text } from "@radix-ui/themes";

//Components
import { DataSetSelector } from "./DataSetSelector";
import { UserMenu } from "./UserMenu";

export const SideControls: React.FC = () => {
    return (
        <div className="sideContainer">
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '1rem',
            }}>
                <UserMenu />

                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                }}>
                    <Text size="1">Select Data Set: </Text>
                    <DataSetSelector />
                </div>
            </div>
        </div>
    )
}