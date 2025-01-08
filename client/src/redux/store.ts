import { configureStore, combineReducers } from "@reduxjs/toolkit";
import logger from 'redux-logger';

import userSlice from './reducers/userReducer';
import databaseSlice from './reducers/databaseReducer';

const allReducers = combineReducers({
    user: userSlice,
    databaseSlice,
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