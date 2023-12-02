import {
  Action,
  ThunkAction,
  TypedStartListening,
  configureStore,
} from "@reduxjs/toolkit";
import {
  useDispatch as useReduxDispatch,
  useSelector as useReduxSelector,
  type TypedUseSelectorHook,
} from "react-redux";
import { reducer } from "./slices";

const store = configureStore({
  reducer,
});

export default store;
export const useDispatch = () => useReduxDispatch<StoreDispatch>();
export const useSelector: TypedUseSelectorHook<StoreState> = useReduxSelector;

export type Store = typeof store;
export type StoreState = ReturnType<typeof store.getState>;
export type StoreDispatch = typeof store.dispatch;
export type StartListening = TypedStartListening<StoreState, StoreDispatch>;
export type Thunk<ReturnType = void> = ThunkAction<
  ReturnType,
  StoreState,
  unknown,
  Action
>;
