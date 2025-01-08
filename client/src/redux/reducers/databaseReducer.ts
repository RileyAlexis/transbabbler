import { createSlice } from "@reduxjs/toolkit";

interface DatabaseType {
    selectedDatabase: string | 'default';
    availableDatabases: string[];
}

const initialState: DatabaseType = {
    selectedDatabase: 'default',
    availableDatabases: [],
}

const databaseSlice = createSlice({
    name: 'database',
    initialState: initialState,
    reducers: {
        setSelectedDatabase(state, action) {
            state = action.payload;
        },
        setSelectedDatabaseToDefault(state) {
            state = initialState;
        },
        setAvilableDatabases(state, action) {
            state = action.payload;
        }
    }
});

export const { setSelectedDatabase, setSelectedDatabaseToDefault, setAvilableDatabases } = databaseSlice.actions;
export default databaseSlice.reducer;
