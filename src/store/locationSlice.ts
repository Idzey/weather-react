import { createSlice } from "@reduxjs/toolkit";

export const locationSlice = createSlice({
    name: "location",
    initialState: {
        city: "London"
    },
    reducers: {
        setCity(state, action) {
            state.city = action.payload;
        }
    }
});

export const { setCity } = locationSlice.actions;