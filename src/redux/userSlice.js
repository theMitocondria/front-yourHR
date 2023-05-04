import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseURL } from "../utils/baseURL";



const initialState = {
    loading: false,
    error: null,
    user: null,
    isLoggedIn: false
}

export const registerUserAction = createAsyncThunk('user/register', async (
    { name, email, password, file },
    { rejectWithValue, getState, dispatch }
) => {
    try {
        console.log(name, email, password, file)

        const formData = new FormData();
        formData.append("name", name)
        formData.append("email", email)
        formData.append("password", password)
        formData.append("file", file)
        const { data } = await axios.post(`${baseURL}/user/register`, formData);

        console.log(data);

        //saving the user into localStorage
        // localStorage.setItem('userInfo', JSON.stringify(data));
        return data;
    } catch (error) {
        console.log(error?.response?.data)
        return rejectWithValue(error?.response?.data);
    }
})



export const signInAction = createAsyncThunk('user/signin', async (
    { email, password },
    { rejectWithValue, getState, dispatch }
) => {
    try {
        console.log(email, password);
        const { data } = await axios.post(`${baseURL}/user/login`, {
            email, password
        });
        //saving the user into localStorage
        // localStorage.setItem('userInfo', JSON.stringify(data));
        return data;
    } catch (error) {
        console.log(error?.response?.data)
        return rejectWithValue(error?.response?.data);
    }
})




const userSlice = createSlice({
    name: "users",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(registerUserAction.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(registerUserAction.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
            state.isLoggedIn = true;
        });
        builder.addCase(registerUserAction.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
            state.isLoggedIn = false;
        });


        builder.addCase(signInAction.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(signInAction.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
            state.isLoggedIn = true;
        });
        builder.addCase(signInAction.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
            state.isLoggedIn = false;
        });
    }
})

const userReducer = userSlice.reducer;
export default userReducer;
