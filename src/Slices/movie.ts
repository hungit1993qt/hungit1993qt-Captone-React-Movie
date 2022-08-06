import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { number } from "yup";
import { Movie } from "../Interface/movie";
import movieAPI from "../Services/movieAPI";
interface State {
  movies: Movie;
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
export const getMovieShowing = createAsyncThunk(
  "movie/getMovieShowing",
  async (numberPgae: number) => {
    try {
      const data = await movieAPI.getMovieShowing(numberPgae);
      return data;
    } catch (error) {
      throw error
    }
  }
);
const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMovieShowing.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getMovieShowing.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.movies = payload;
    });
    builder.addCase(getMovieShowing.rejected, (state, { error }) => {
      state.isLoading = false;
      state.error = error as any;
    });
  },
});
// export actions

// export reducer
export default movieSlice.reducer;
