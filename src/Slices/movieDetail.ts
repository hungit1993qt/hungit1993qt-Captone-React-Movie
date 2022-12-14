import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Movie } from "Interface/movie";
import movieAPI from "../Services/movieAPI";
interface State {
  movies: Movie; // phải định dạng đúng kiểu 1 là [array] 2 là object
  isLoading: boolean;
  error: string | null;
}

const initialState: State = {
  movies: {
    currentPage: null,
    count: null,
    totalPages: null,
    totalCount: null,
    items: [{
      maPhim: null,
      tenPhim: null,
      biDanh: null,
      trailer: null,
      hinhAnh: null,
      moTa: null,
      maNhom: null,
      hot: null,
      dangChieu: null,
      sapChieu: null,
      ngayKhoiChieu: null,
      danhGia: null,

    }]
  },
  isLoading: false,
  error: null,
};
// thunk actions
export const getMovieDetails = createAsyncThunk(
  "movie/getMovieDetails",
  async (maPhim: number) => {
    try {
      const data = await movieAPI.getMovieDetails(maPhim);
      // console.log(data)
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
    builder.addCase(getMovieDetails.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getMovieDetails.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.movies = payload;
    });
    builder.addCase(getMovieDetails.rejected, (state, { error }) => {
      state.isLoading = false;
      state.error = error as any;
    });
  },

});
// export actions

// export reducer
export default movieDetailSlice.reducer;

