import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { LoginValues } from 'Interface/loginValue'
import authAPI from '../Services/authAPI'
import { User } from 'Interface/user'
import Swal from 'sweetalert2'



// const message: string | null = "Hello"
// const number = message as string
interface State {
  auth: User | null,
  message: string | null,
  isLoading: boolean;
  error: string | null;
}


const initialState: State = {
  auth: JSON.parse(localStorage.getItem("user") as string) || null,
  message: null,
  isLoading: false,
  error: null,


};


// Viết actions login và register
export const postUserLogin = createAsyncThunk("auth/login", async (loginValueT: LoginValues) => {
  try {
    const data = await authAPI.postUserLogin(loginValueT)
    // Lưu thông tin user xuống localStorage
    if (!data.hoTen) {

      Swal.fire({
        icon: 'error',
        title: 'CÓ LỖI XẢY RA',
        text: 'Tài khoản hoặc mật khẩu không đúng!',
        footer: '<a href="register">Bạn chưa có tài khoản? tạo ngay</a>'
      })
    } else {
      localStorage.setItem("user", JSON.stringify(data));
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Đăng nhập thành công!',
        showConfirmButton: false,
        timer: 1500
      });
      
    }

    //  chỗ này set lại data đi
    return data;
  } catch (error) {
    throw error;
  }
});



const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logOut: (state) => {
      localStorage.clear();
      state.auth = null;
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Đăng xuất thành công!',
        showConfirmButton: false,
        timer: 1500
      })

    }
  },
  extraReducers: (builder) => {
    builder.addCase(postUserLogin.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(postUserLogin.fulfilled, (state, { payload }) => {
      state.auth = payload

    });
    builder.addCase(postUserLogin.rejected, (state, { error }) => {
      state.isLoading = false;
      state.error = error as any;
    });


  },
});
export const { logOut } = authSlice.actions;
export default authSlice.reducer;
