import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { weatherApi } from "./weatherApi";
import { locationSlice } from "./locationSlice";
import { searchSlice } from "./searchSlice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { settingsSlice } from "./settingsSlice";

const locationPersistConfig = {
  key: "location",
  storage,
};

const settingsPersistConfig = {
  key: "settings",
  storage,
};

const persistedLocationReducer = persistReducer(locationPersistConfig, locationSlice.reducer);
const persistedSettingsReducer = persistReducer(settingsPersistConfig, settingsSlice.reducer);

const rootReducer = combineReducers({
  [weatherApi.reducerPath]: weatherApi.reducer,
  location: persistedLocationReducer,
  search: searchSlice.reducer,
  settings: persistedSettingsReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
  }).concat(weatherApi.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
