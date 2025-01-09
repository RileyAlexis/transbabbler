import { UserType } from "./UserType";
import { DatabaseType } from "./DatabaseType";
import { CalloutStateType } from "./CalloutState";

export interface BabbleRootState {
    user: UserType;
    database: DatabaseType;
    calloutState: CalloutStateType;
}