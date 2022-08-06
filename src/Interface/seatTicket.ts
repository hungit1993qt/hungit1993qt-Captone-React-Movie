import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import movieAPI from "Services/movieAPI";

export interface seatTicket {
    thongTinPhim: {
        maLichChieu: number | null;
        tenCumRap: string | null;
        tenRap: string | null;
        diaChi: string | null;
        tenPhim: string | null;
        hinhAnh: string | null;
        ngayChieu: string | null;
        gioChieu: string | null;
    },
    danhSachGhe: [
        {
            maGhe: number | null;
            tenGhe: string | null;
            maRap: number | null;
            loaiGhe: LoaiGhe | null;
            stt: string | null;
            giaVe: number | null;
            daDat: boolean ;
            taiKhoanNguoiDat: null;
        }
    ],

}
export enum LoaiGhe {
    Thuong = "Thuong",
    Vip = "Vip",
}

