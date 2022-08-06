import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ListSeatBooking } from "Interface/listSeatBooking";
import movieAPI from "Services/movieAPI";
import { ListPay } from 'Interface/listPay'
interface State {
    listSeatBooking: ListSeatBooking[],
    message: string,
    isLoading: boolean;
    error: string | null;
}
const initialState: State = {
    listSeatBooking: [],
    message: "",
    isLoading: false,
    error: null,
}



// tạo thunk action
export const postSeatBooking = createAsyncThunk(
    "movie/postSeatBooking",
    async (thongTinDatVe: ListPay) => {
        try {
            const data = await movieAPI.postSeatBooking(thongTinDatVe);
            return data
        } catch (error) {
            throw error
        }
    }
);

const seatBookingSlice = createSlice({
    name: "movie",
    initialState,
    reducers: {
        SeatBookingSlice: (state, { payload }) => {
            let index = state.listSeatBooking.findIndex(seatUpdate => seatUpdate.maGhe === payload.maGhe);

            if (index != (-1)) {
                state.listSeatBooking = [...state.listSeatBooking].filter((seatBooking) => seatBooking.maGhe !== payload.maGhe)

            } else {
                if (state.listSeatBooking.length > 4) {
                    alert("Không được đặt quá 5 vé")
                    state.listSeatBooking = [...state.listSeatBooking]
                } else {
                    state.listSeatBooking = [...state.listSeatBooking, payload]
                }
            }
        },
        DeleteBooking: (state, { payload }) => {
            state.listSeatBooking = [...state.listSeatBooking].filter((seat) => seat.maGhe !== payload)
        },
        DeleteAllBooking: (state) => {
            state.listSeatBooking = []
        }
    },
    extraReducers: (builder) => {
        builder.addCase(postSeatBooking.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(postSeatBooking.fulfilled, (state, { payload }) => {
            state.isLoading = false;
            state.message = payload
            state.listSeatBooking = []
            alert(state.message)
            
        });
        builder.addCase(postSeatBooking.rejected, (state, { error }) => {
            state.isLoading = false;
            state.error = error as any;
            
        });
    },

});
export const { SeatBookingSlice, DeleteBooking, DeleteAllBooking } = seatBookingSlice.actions
export default seatBookingSlice.reducer