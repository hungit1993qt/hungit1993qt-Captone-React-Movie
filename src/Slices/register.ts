import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authAPI from '../Services/authAPI'
import { RegisterValue } from 'Interface/register'

interface State {
    RegisterValue: RegisterValue;
    message:string | null,
    isLoading: boolean;
    error: string | null;
};
const initialState: State = {
    RegisterValue: {
        taiKhoan: null,
        matKhau: null,
        email: null,
        soDt: null,
        hoTen: null,
        maNhom: null,
    },
    message:null,
    isLoading: false,
    error: null,
};

export const postRegisterUser = createAsyncThunk(
    "auth/Register",
    async (RegisterValue: RegisterValue) => {
        try {
            const data = await authAPI.postRegisterUser(RegisterValue);
            if (!data.email) {
                alert(data)

            } else {
                localStorage.setItem("registerUser", JSON.stringify(data));
            }
            return data

        } catch (error) {
            throw error
        }
    }
)
const authRegisterSlices = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(postRegisterUser.pending, (state) => {
            state.isLoading = true
        });
        builder.addCase(postRegisterUser.fulfilled, (state, { payload }) => {
            state.isLoading = false
            state.RegisterValue = payload
        });
        builder.addCase(postRegisterUser.rejected, (state, { error }) => {
            state.isLoading = false
            state.error = error as any
            console.log(error)
        })
    }
})
export default authRegisterSlices.reducer