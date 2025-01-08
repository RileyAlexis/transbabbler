import { UserType } from "./UserType";
import { DatabaseType } from "./DatabaseType";

export interface BabbleRootState {
    user: UserType;
    database: DatabaseType
}