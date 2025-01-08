import { configureStore, combineReducers } from "@reduxjs/toolkit";
import logger from 'redux-logger';

import userSlice from './reducers/userReducer';

const allReducers = combineReducers({
    user: userSlice,
});

const storeInstance = configureStore({
    reducer: allReducers,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }).concat(logger),
});

export { storeInstance };
export type AppDispatch = typeof storeInstance.dispatch;