import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { LoginValues } from 'Interface/loginValue'
import authAPI from '../Services/authAPI'
import { User } from 'Interface/user'

// const message: string | null = "Hello"
// const number = message as string
interface State {
  auth: User | null,
  isLoading: boolean;
  error: string | null;
}


const initialState: State = {
  auth: JSON.parse(localStorage.getItem("user") as string) || null,
  isLoading: false,
  error: null,


};


// Viết actions login và register
export const postUserLogin = createAsyncThunk("auth/login", async (loginValueT: LoginValues) => {
  try {
    const data = await authAPI.postUserLogin(loginValueT)
    // Lưu thông tin user xuống localStorage
    if(!data.hoTen){
      alert("Tài khoản hoặc mật khẩu đăng nhập không đúng")
    }else{
      localStorage.setItem("user", JSON.stringify(data));
    }
    
    //  chỗ này set lại data đi
    return data;
  } catch (error) {
    throw error;
  }
});
export const logOut = createAsyncThunk("auth/logOut", () => {
  try {
    const data = localStorage.clear();
    return data
  } catch (error) {
    throw error
  }
})


const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
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
    builder.addCase(logOut.fulfilled,(state,{payload})=>{
      state.auth = null
    })

  },
});

export default authSlice.reducer;
