

import rootReducer from "./reducers";
import { configureStore, UnknownAction } from "@reduxjs/toolkit";
import type { ThunkAction } from "redux-thunk";



//const composedEnhancer = composeWithDevTools (applyMiddleware(thunk));
//const store = createStore(rootReducer, composedEnhancer)
const store = configureStore({
    reducer: rootReducer,
});

//export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType> = ThunkAction<ReturnType, RootState, undefined, UnknownAction>
//export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;