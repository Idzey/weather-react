import { createSlice } from "@reduxjs/toolkit";

export const settingsSlice = createSlice({
    name: "settings",
    initialState: {
        lang: "en",
        theme: "dark"
    },
    reducers: {
        setLang(state, action) {
            state.lang = action.payload;
        },
        setTheme(state, action) {
            state.theme = action.payload;
        }
    }
});

export const { setLang, setTheme } = settingsSlice.actions;