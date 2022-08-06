import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { seatTicket } from "Interface/seatTicket";
import movieAPI from "../Services/movieAPI";
interface State {
    seatTicket: seatTicket,
    isLoading: boolean;
    error: string | null;
}
const initialState: State = {
    seatTicket: {
        thongTinPhim: {
            maLichChieu: null,
            tenCumRap: null,
            tenRap: null,
            diaChi: null,
            tenPhim: null,
            hinhAnh: null,
            ngayChieu: null,
            gioChieu: null,
        },
        danhSachGhe: [{
            maGhe: null,
            tenGhe: null,
            maRap: null,
            loaiGhe: null,
            stt: null,
            giaVe: null,
            daDat: false,
            taiKhoanNguoiDat: null,
        }]

    }
    ,
    isLoading: false,
    error: null,
}



// tạo thunk action
export const getSeatTicket = createAsyncThunk(
    "move/getSeatTicket",
    async (maLichChieu: number) => {
        try {
            const data = await movieAPI.getSeatTicket(maLichChieu);
            return data;
        } catch (error) {
            throw error
        }
    }
);

const movieDetailSlice = createSlice({
    name: "movie",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getSeatTicket.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getSeatTicket.fulfilled, (state, { payload }) => {
            state.isLoading = false
            state.seatTicket = payload
        });
        builder.addCase(getSeatTicket.rejected, (state, { error }) => {
            state.isLoading = false
            state.error = error as any
        });
    },
});
export default movieDetailSlice.reducer