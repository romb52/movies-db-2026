//import rootReducer from "./reducers";
import { configureStore, UnknownAction } from "@reduxjs/toolkit";
import type { ThunkAction } from "redux-thunk";
import { tmdbApi } from "./services/tmdb";
import { setupListeners } from "@reduxjs/toolkit/query";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import { rickandmortyApi } from "./services/rickandmorty";

//const composedEnhancer = composeWithDevTools (applyMiddleware(thunk));
//const store = createStore(rootReducer, composedEnhancer)
const store = configureStore({
  reducer: {
    [tmdbApi.reducerPath]: tmdbApi.reducer,
    [rickandmortyApi.reducerPath]: rickandmortyApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(tmdbApi.middleware, rickandmortyApi.middleware),
});

setupListeners(store.dispatch);

//export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType> = ThunkAction<ReturnType, RootState, undefined, UnknownAction>;
//export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch = useDispatch<AppDispatch>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
