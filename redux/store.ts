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
});

// call the refresh token function on every page load or refresh
const initializeApp = async () => {
    // Execute refreshToken
    const refreshTokenAction = store.dispatch(apiSlice.endpoints.refreshToken.initiate({}, { forceRefetch: true }));

    // Wait for the refreshTokenAction to complete
    await refreshTokenAction;

    // Check if refreshToken was successful
    if ((await refreshTokenAction).isSuccess) {
        // Now, execute the loadUser dispatch
        await store.dispatch(apiSlice.endpoints.loadUser.initiate({}, { forceRefetch: true }));
    } else {
        // Handle the case when refreshToken fails
        console.error('Refresh token failed.');
    }
};



initializeApp();