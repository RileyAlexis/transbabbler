import { UserType } from "./UserType";
import { DatabaseType } from "./DatabaseType";
import { BabbleType } from "./BabbleType";

export interface BabbleRootState {
    user: UserType;
    database: DatabaseType;
    babble: BabbleType;
}