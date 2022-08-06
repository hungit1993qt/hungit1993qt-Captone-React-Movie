import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { showTime } from "Interface/showtimes";
import { number } from "yup";
import movieAPI from "../Services/movieAPI";
interface State {
  showtimes: showTime; // phải định dạng đúng kiểu 1 là [array] 2 là object
  isLoading: boolean;
  error: string | null;
}

const initialState: State = {
  showtimes: {
    heThongRapChieu: [{
      cumRapChieu: [{
        lichChieuPhim: [{
          maLichChieu: 0,
          maRap: "",
          tenRap: "",
          ngayChieuGioChieu: "",
          giaVe: null,
          thoiLuong: null,
        }],
        maCumRap: "",
        tenCumRap: "",
        hinhAnh: "",
        diaChi: "",
      }],
      maHeThongRap: "",
      tenHeThongRap: "",
      logo: "",
    }],
    maPhim:  null,
    tenPhim: "",
    biDanh: "",
    trailer: "",
    hinhAnh: "",
    moTa: "",
    maNhom: "",
    hot: null,
    dangChieu:  null,
    sapChieu: null,
    ngayKhoiChieu: "",
    danhGia: null,
  },
  isLoading: false,
  error: null,
};
// thunk actions
export const getMovieShowTime = createAsyncThunk(
  "movie/getMovieShowTime",
  async (maPhim: number) => {
    try {
      const data = await movieAPI.getMovieShowTime(maPhim);
      // console.log(data)
      return data;
    } catch (error) {
      throw error
    }
  }
);
const movieShowTimeSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMovieShowTime.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getMovieShowTime.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.showtimes = payload;
    });
    builder.addCase(getMovieShowTime.rejected, (state, { error }) => {
      state.isLoading = false;
      state.error = error as any;
    });
  },

});
// export actions

// export reducer
export default movieShowTimeSlice.reducer;

