import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Cinimax } from 'Interface/Cinimax'
import movieAPI from 'Services/movieAPI'

interface State {
    cinimax: Cinimax[],
    isLoading: boolean,
    error: String | null
}
const initialState: State = {
    cinimax: [{
        lstCumRap: [{
            danhSachPhim: [{
                lstLichChieuTheoPhim: [{
                    maLichChieu: null,
                    maRap: null,
                    tenRap: null,
                    ngayChieuGioChieu: null,
                    giaVe: null,
                }],
                maPhim: null,
                tenPhim: null,
                hinhAnh: null,
                hot: null,
                dangChieu: null,
                sapChieu: null,
            }],
            maCumRap: null,
            tenCumRap: null,
            hinhAnh: null,
            diaChi: null,
        }],
        maHeThongRap: null,
        tenHeThongRap: null,
        logo: null,
        mahom: null,
    }],
    isLoading: false,
    error: null
}
export const getCinimax = createAsyncThunk(
    "movie/getCinimax",
    async()=>{
        try {
            const data = await movieAPI.getCinimax();
            return data
        } catch (error) {
            throw error
        }
    }
)
const getCinimaxSlices = createSlice({
    name:"cinimax",
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder.addCase(getCinimax.pending, (state) => {
            state.isLoading = true
        });
        builder.addCase(getCinimax.fulfilled, (state, { payload }) => {
            state.isLoading = false
            state.cinimax = payload
        });
        builder.addCase(getCinimax.rejected, (state, { error }) => {
            state.isLoading = false
            state.error = error as any
        })
    }
})
export default getCinimaxSlices.reducer