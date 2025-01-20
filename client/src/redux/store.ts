import { configureStore, combineReducers } from "@reduxjs/toolkit";
import logger from 'redux-logger';

import userSlice from './reducers/userReducer';
import databaseSlice from './reducers/databaseReducer';
import babbleSlice from './reducers/babbleReducer';

const allReducers = combineReducers({
    user: userSlice,
    database: databaseSlice,
    babble: babbleSlice,
});

const storeInstance = configureStore({
    reducer: allReducers,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        })
            .concat(logger),
});

export { storeInstance };
export type AppDispatch = typeof storeInstance.dispatch;