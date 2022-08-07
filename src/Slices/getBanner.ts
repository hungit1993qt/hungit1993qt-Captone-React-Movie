import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Banner } from 'Interface/Banner'
import movieAPI from 'Services/movieAPI'

interface State {
    banner: Banner[],
    isLoading: boolean,
    error: String | null
}
const initialState: State = {
    banner: [{
        maBanner: null,
        maPhim: null,
        hinhAnh: null,
    }],
    isLoading: false,
    error: null
}
export const getBanner = createAsyncThunk(
    "movie/getBanner",
    async () => {
        try {
            const data = await movieAPI.getBanner();
            return data
        } catch (error) {
            throw error
        }
    }
)
const getBannerSlice = createSlice({
    name: "banner",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getBanner.pending, (state) => {
            state.isLoading = true
        });
        builder.addCase(getBanner.fulfilled, (state, { payload }) => {
            state.isLoading = false
            state.banner = payload
        });
        builder.addCase(getBanner.rejected, (state, { error }) => {
            state.isLoading = false
            state.error = error as any
        })
    }
})
export default getBannerSlice.reducer