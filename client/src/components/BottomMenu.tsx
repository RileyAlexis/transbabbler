import { GenerateBabbleButton } from "./GenerateBabbleButton";
import { DataSetSelector } from "./DataSetSelector";
import { ClearBabbleButton } from "./ClearBabbleButton";
import { UserMenu } from "./UserMenu";

export const BottomMenu: React.FC = () => {
    return (
        <div className="bottomMenu">
            <div className="bottomMenuButtonsContainer">
                <GenerateBabbleButton size="2" title="Babble" />
                <DataSetSelector size="2" title="Data" />
                <ClearBabbleButton size="2" title="Clear" />

                {/* <UserMenu /> */}
            </div>
        </div>
    )
}