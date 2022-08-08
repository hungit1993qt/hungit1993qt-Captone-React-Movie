export interface Cinimax {
    lstCumRap: [{
        danhSachPhim: [{
            lstLichChieuTheoPhim: [{
                maLichChieu: number | null;
                maRap: string | null;
                tenRap: TenRap | null;
                ngayChieuGioChieu: string | null;
                giaVe: number | null;
            }];
            maPhim: number | null;
            tenPhim: string | null;
            hinhAnh: string | null;
            hot: boolean | null;
            dangChieu: boolean | null;
            sapChieu: boolean | null;
        }];
        maCumRap: string | null;
        tenCumRap: string | null;
        hinhAnh: string | null;
        diaChi: string | null;
    }];
    maHeThongRap: string | null;
    tenHeThongRap: string | null;
    logo: string | null;
    mahom: string | null;
}
export enum TenRap {
    Rạp1 = "Rạp 1",
    Rạp10 = "Rạp 10",
    Rạp2 = "Rạp 2",
    Rạp3 = "Rạp 3",
    Rạp4 = "Rạp 4",
    Rạp5 = "Rạp 5",
    Rạp6 = "Rạp 6",
    Rạp7 = "Rạp 7",
    Rạp8 = "Rạp 8",
    Rạp9 = "Rạp 9",
}