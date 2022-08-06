import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Booked } from "Interface/Booked";
import authAPI from '../Services/authAPI'
interface State {
    inforBookeds: Booked,
    isLoading: boolean;
    error: string | null;
};
const initialState: State = {
    inforBookeds: {
        taiKhoan: null,
        matKhau: null,
        hoTen: null,
        email: null,
        soDT: null,
        maNhom: null,
        maLoaiNguoiDung: null,
        loaiNguoiDung: {
            maLoaiNguoiDung: null,
            tenLoai: null,
        },
        thongTinDatVe: [{
            danhSachGhe: [{
                maHeThongRap: null,
                tenHeThongRap: null,
                maCumRap: null,
                tenCumRap: null,
                maRap: null,
                tenRap: null,
                maGhe: null,
                tenGhe: null,
            }],
            maVe: null,
            ngayDat: null,
            tenPhim: null,
            hinhAnh: null,
            giaVe: null,
            thoiLuongPhim: null,
        }],
    },
    isLoading: false,
    error: null,
};
export const getBookedUser = createAsyncThunk(
    "auth/getBookedUser",
    async () => {
        try {
            const data = await authAPI.getBookedUser();
            return data
        } catch (error) {
            throw error
        }
    }
);
const getBookedUserSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getBookedUser.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getBookedUser.fulfilled, (state, { payload }) => {
            state.isLoading = false;
            state.inforBookeds = payload;
        });
        builder.addCase(getBookedUser.rejected, (state, { error }) => {
            state.isLoading = false;
            state.error = error as any
        });
    }
})
export default getBookedUserSlice.reducer