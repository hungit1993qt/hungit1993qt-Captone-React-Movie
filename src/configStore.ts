import { configureStore } from "@reduxjs/toolkit";
import movie from "./Slices/movie";
import auth from "./Slices/auth";
import detail from './Slices/movieDetail'
import showtime from './Slices/showTime'
import seatTicket from './Slices/seatTicket'
import listSeatBooking from './Slices/listSeatBooking'
import message from './Slices/listSeatBooking'
import RegisterValue from './Slices/register'
import inforBooked from './Slices/inforBooked'
import banner from './Slices/getBanner'




const store = configureStore({
  reducer: {
    movie,
    auth,
    detail,
    showtime,
    seatTicket,
    listSeatBooking,
    message,
    RegisterValue,
    inforBooked,
    banner,
  },
});

// type cho hàm dispatch
export type AppDispatch = typeof store.dispatch;
// type cho state
export type RootState = ReturnType<typeof store.getState>;

export default store;

//utility type
//ReturnType: trả vê type của object
//type abc (biến type giống var let const)
// function A(): number {
//   return 123;
// }
// // () => number
// type typeCuaHamA = ReturnType<typeof A>;
