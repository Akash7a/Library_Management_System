import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    admin: null,
    error: null,
    pending: false,
    success: false,
    message: null,
    token: null,
};

export const registeAdmin = createAsyncThunk(
    "auth/register",
    async (userData, thunkApi) => {
        try {
            const response = await axios.post("/api/v1/admin/register", userData, { withCredentials: true });
            return response.data;
        } catch (error) {
            const isValidationError = error.response?.status === 400;
            return thunkApi.rejectWithValue(
                isValidationError ? "Invalid input data" : "Something went wrong"
            );
        }
    }
);

export const loginAdmin = createAsyncThunk("auth/login", async (userData, thunkApi) => {
    try {
        const response = await axios.post("/api/v1/admin/login", userData, { withCredentials: true });
        return response.data;
    } catch (error) {
        const isValidationError = error.response?.status === 400;
        return thunkApi.rejectWithValue(
            isValidationError ? "Invalid input data" : "Something went wrong"
        );
    }
});

export const logoutAdmin = createAsyncThunk("auth/logout", async (_, thunkApi) => {
    try {
        const response = await axios.get("/api/v1/admin/logout", { withCredentials: true });
        return response.data;
    } catch (error) {
        const isValidationError = error.response?.status === 400;
        return thunkApi.rejectWithValue(
            isValidationError ? "Invalid input data" : "Something went wrong"
        );
    }
});

export const loadAdminFromToken = createAsyncThunk("auth/load", async (_, thunkApi) => {
    const token = localStorage.getItem("token");

    if (!token) return thunkApi.rejectWithValue("No token found");

    try {
        const response = await axios.get("/api/v1/admin/getProfile", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        return thunkApi.rejectWithValue(error.response?.data || "Invalid token");
    }
});


const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        clearSuccess: (state) => {
            state.success = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(registeAdmin.pending, (state) => {
                state.pending = true;
                state.error = null;
                state.message = "Request in progress";
            })
            .addCase(registeAdmin.fulfilled, (state, action) => {
                state.pending = false;
                state.success = true;
                state.admin = action.payload;
                state.message = action.payload.message || "Admin registered successfully";
                state.token = action.payload.token || null;

                if (action.payload.token) {
                    localStorage.setItem("token", action.payload.token);
                }
            })
            .addCase(registeAdmin.rejected, (state, action) => {
                state.pending = false;
                state.error = action.payload;
                state.message = "Registration failed";
            });
        builder
            .addCase(loginAdmin.pending, (state) => {
                state.pending = true;
                state.message = "Request in Progress"
            })
            .addCase(loginAdmin.fulfilled, (state, action) => {
                state.pending = false;
                state.error = null;
                state.success = true;
                state.message = action.payload;
                state.admin = action.payload;
                state.token = action.payload.token || null;

                if (action.payload.token) {
                    localStorage.setItem("token", action.payload.token);
                }
            })
            .addCase(loginAdmin.rejected, (state, action) => {
                state.pending = false;
                state.error = action.payload;
                state.message = "Registration failed";
            });
        builder
            .addCase(logoutAdmin.pending, (state) => {
                state.pending = true;
                state.message = "Request in Progress"
            })
            .addCase(logoutAdmin.fulfilled, (state, action) => {
                state.pending = false;
                state.error = null;
                state.message = action.payload;
                state.token = null;
                state.admin = null;
                localStorage.removeItem("token");
            })
            .addCase(logoutAdmin.rejected, (state, action) => {
                state.pending = false;
                state.error = action.payload;
                state.message = "Logout failed.";
            });
        builder
            .addCase(loadAdminFromToken.pending, (state) => {
                state.pending = true;
                state.message = "Loading admin data...";
            })
            .addCase(loadAdminFromToken.fulfilled, (state, action) => {
                state.pending = false;
                state.success = true;
                state.admin = action.payload.admin;
                state.token = localStorage.getItem("token");
                state.message = "Admin loaded successfully";
            })
            .addCase(loadAdminFromToken.rejected, (state, action) => {
                state.pending = false;
                state.error = action.payload;
                state.message = "Failed to load admin data.";
                state.token = null;
                state.admin = null;
                localStorage.removeItem("token");
            });
    },
});

export const { clearError, clearSuccess } = authSlice.actions;
export default authSlice.reducer;