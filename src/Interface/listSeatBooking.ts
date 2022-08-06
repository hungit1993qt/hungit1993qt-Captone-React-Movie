export interface ListSeatBooking {
    maGhe: number | null;
    tenGhe: string | null;
    maRap: number | null;
    loaiGhe: LoaiGhe | null;
    stt: string | null;
    giaVe: number | null;
    daDat: boolean | null;
    taiKhoanNguoiDat: null;
}
export enum LoaiGhe {
    Thuong = "Thuong",
    Vip = "Vip",
}
