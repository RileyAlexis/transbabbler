import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BabbleType } from "src/Types/BabbleType";


const initialState: BabbleType = [];

const babbleSlice = createSlice({
    name: 'babble',
    initialState: initialState,
    reducers: {
        addBabbleLine(state, action: PayloadAction<string>) {
            state.push(action.payload);
        },
        clearBabble(state) {
            state = [];
            return state;
        }
    }
});

export const { addBabbleLine, clearBabble } = babbleSlice.actions;

export default babbleSlice.reducer;