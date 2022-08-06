import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authAPI from '../Services/authAPI'
import { RegisterValue } from 'Interface/register'
import Swal from 'sweetalert2'

interface State {
    RegisterValue: RegisterValue;
    message: string | null,
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
    message: null,
    isLoading: false,
    error: null,
};

export const postRegisterUser = createAsyncThunk(
    "auth/Register",
    async (RegisterValue: RegisterValue) => {
        try {
            const data = await authAPI.postRegisterUser(RegisterValue);
            if (data) {
                if (!data.email) {
                    Swal.fire({
                        icon: 'error',
                        title: 'CÓ LỖI XẢY RA',
                        text: `${data}!`,
                        footer: '<a href="register">Bạn chưa có tài khoản? tạo ngay</a>'
                    })

                } else {
                    localStorage.setItem("registerUser", JSON.stringify(data));
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Đăng ký thành công!',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
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
        })
    }
})
export default authRegisterSlices.reducer