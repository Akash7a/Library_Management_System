import {configureStore} from "@reduxjs/toolkit";
import authReducer from "../features/Auth/AuthSlice.js";

export const store = configureStore({
    reducer:{
        auth:authReducer
    }
});
