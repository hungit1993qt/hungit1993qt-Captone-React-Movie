export interface Movie {
  currentPage: number | null;
  count: number | null;
  totalPages: number | null;
  totalCount: number | null;
  items: [{
    maPhim: number | null;
    tenPhim: string | null;
    biDanh: string | null;
    trailer: string | null;
    hinhAnh: string | null;
    moTa: string | null;
    maNhom: string | null;
    hot: boolean | null;
    dangChieu: boolean | null;
    sapChieu: boolean | null;
    ngayKhoiChieu: String | null;
    danhGia: number | null;
  }];

}
