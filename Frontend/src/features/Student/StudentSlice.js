import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    error: null,
    pending: false,
    success: false,
    message: null,
    students: null,
};

export const getStudents = createAsyncThunk("auth/students", async (_, thunkApi) => {
    try {
        const response = await axios.get("/api/v1/student/getStudents", { withCredentials: true });
        return response.data;
    } catch (error) {
        return thunkApi.rejectWithValue(error.response?.data || "Invalid token");
    }
});

export const addStudents = createAsyncThunk("auth/addStudents", async (userData, thunkApi) => {
    try {
        const response = await axios.post("/api/v1/student/addNewStudent", userData, { withCredentials: true });
        return response.data;
    } catch (error) {
        return thunkApi.rejectWithValue(error.response?.data || "Invalid token");
    }
});

const studentSlice = createSlice({
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
            .addCase(getStudents.pending, (state) => {
                state.pending = true;
                state.message = "Request in Progress";
            })
            .addCase(getStudents.fulfilled, (state, action) => {
                state.pending = false;
                state.error = null;
                state.success = true;
                state.message = action.payload.message;
                state.students = action.payload.myStudents;
            })
            .addCase(getStudents.rejected, (state, action) => {
                state.pending = false;
                state.error = action.payload;
                state.message = "Failed to get students.";
            });
        builder
            .addCase(addStudents.pending, (state) => {
                state.pending = true;
                state.message = "Request in Progress";
            })
            .addCase(addStudents.fulfilled, (state, action) => {
                state.pending = false;
                state.error = null;
                state.success = true;
                state.students = action.payload.myStudents;
                state.message = action.payload?.message || "Student added successfully.";
            })
            .addCase(addStudents.rejected, (state, action) => {
                state.pending = false;
                state.error = action.payload;
                state.message = "Failed to add students.";
            });
    }
});


export const {clearError,clearSuccess} = studentSlice.actions;
export default studentSlice.reducer;