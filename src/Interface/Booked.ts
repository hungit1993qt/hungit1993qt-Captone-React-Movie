export interface Booked {
    taiKhoan: string | null;
    matKhau: string | null;
    hoTen: string | null;
    email: string | null;
    soDT: string | null;
    maNhom: string | null;
    maLoaiNguoiDung: string | null;
    loaiNguoiDung: {
        maLoaiNguoiDung: string | null,
        tenLoai: string | null,
    };
    thongTinDatVe: [{
        danhSachGhe: [{
            maHeThongRap: MaHeThongRap| null;
            tenHeThongRap: TenHeThongRap| null;
            maCumRap: Rap| null;
            tenCumRap: Rap| null;
            maRap: number| null;
            tenRap: Rap| null;
            maGhe: number| null;
            tenGhe: string| null;
        }];
        maVe: number| null;
        ngayDat: string| null;
        tenPhim: string| null;
        hinhAnh: string| null;
        giaVe: number| null;
        thoiLuongPhim: number| null;
    }] | null,
}
export enum MaHeThongRap {
    BHDStar = "BHDStar",
    Cgv = "CGV",
    Galaxy = "Galaxy",
}
export enum Rap {
    Rạp1 = "Rạp 1",
    Rạp2 = "Rạp 2",
    Rạp3 = "Rạp 3",
    Rạp7 = "Rạp 7",
    Rạp8 = "Rạp 8",
    Rạp9 = "Rạp 9",
}
export enum TenHeThongRap {
    BHDStarCineplex32 = "BHD Star Cineplex - 3/2",
    BHDStarCineplexBitexco = "BHD Star Cineplex - Bitexco",
    CGVAeonBìnhTân = "CGV - Aeon Bình Tân",
    CGVHùngVươngPlaza = "CGV - Hùng Vương Plaza",
    CGVLibertyCitypoint = "CGV - Liberty Citypoint",
    CGVPandoraCity = "CGV - Pandora City",
    GLXNguyễnDu = "GLX - Nguyễn Du",
}
