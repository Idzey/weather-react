import storage from "redux-persist/lib/storage";
import { settingsSlice } from "../../shared/model/settingsSlice";
import { locationSlice } from "../../shared/model/locationSlice";
import { searchSlice } from "../../shared/model/searchSlice";
import persistReducer from "redux-persist/es/persistReducer";
import { combineReducers } from "@reduxjs/toolkit";
import { weatherApi } from "../../entities/weather/api/weatherApi";

const locationPersistConfig = {
  key: "location",
  storage,
};

const settingsPersistConfig = {
  key: "settings",
  storage,
};

const persistedLocationReducer = persistReducer(
  locationPersistConfig,
  locationSlice.reducer
);
const persistedSettingsReducer = persistReducer(
  settingsPersistConfig,
  settingsSlice.reducer
);

export const rootReducer = combineReducers({
  [weatherApi.reducerPath]: weatherApi.reducer,
  location: persistedLocationReducer,
  search: searchSlice.reducer,
  settings: persistedSettingsReducer,
});
