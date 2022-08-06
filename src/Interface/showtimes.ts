export interface showTime {
    heThongRapChieu: [{
        cumRapChieu: [{
            lichChieuPhim: [{
                maLichChieu: number;
                maRap: string;
                tenRap: string;
                ngayChieuGioChieu: string;
                giaVe: number | null;
                thoiLuong: number | null;
            }],
            maCumRap: string,
            tenCumRap: string,
            hinhAnh: string,
            diaChi: string,

        }],
        maHeThongRap: string,
        tenHeThongRap: string,
        logo: string,
    }],
    maPhim: number | null;
    tenPhim: string;
    biDanh: string;
    trailer: string;
    hinhAnh: string;
    moTa: string;
    maNhom: string;
    hot: boolean | null;
    dangChieu: boolean | null;
    sapChieu: boolean | null;
    ngayKhoiChieu: string;
    danhGia: number | null;
}