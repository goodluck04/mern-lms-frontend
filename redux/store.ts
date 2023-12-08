"use client"
import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./features/api/apiSlice";
import authSlice from "./features/auth/authSlice";

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authSlice,
    },
    devTools: true, // letter make it false
    middleware: (getDefaultMiddeware) => getDefaultMiddeware().concat(apiSlice.middleware)
})