
//RadixUI
import { Text } from "@radix-ui/themes";

//Components
import { DataSetSelector } from "./DataSetSelector";
import { UserMenu } from "./UserMenu";
import { GenerateBabbleButton } from "./GenerateBabbleButton";
import { ClearBabbleButton } from "./ClearBabbleButton";

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
                    <DataSetSelector size="3" />
                </div>
                <GenerateBabbleButton size="2" title="Generate Babble" />
                <ClearBabbleButton size="2" />
            </div>
        </div>
    )
}