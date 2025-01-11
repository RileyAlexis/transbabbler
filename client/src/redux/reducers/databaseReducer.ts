import { createSlice } from "@reduxjs/toolkit";

import { DatabaseType } from "src/Types/DatabaseType";

const initialState: DatabaseType = {
    selectedDatabase: 'Technobabble',
    availableDatabases: [],
}

const databaseSlice = createSlice({
    name: 'database',
    initialState: initialState,
    reducers: {
        setSelectedDatabase(state, action) {
            state.selectedDatabase = action.payload;
        },
        setSelectedDatabaseToDefault(state) {
            state.selectedDatabase = 'default';
        },
        setAvilableDatabases(state, action) {
            state.availableDatabases = action.payload;
        }
    }
});

export const { setSelectedDatabase, setSelectedDatabaseToDefault, setAvilableDatabases } = databaseSlice.actions;
export default databaseSlice.reducer;
