import { Movie } from "../Interface/movie";
import { ListPay } from 'Interface/listPay'
import axiosClient from "./axiosClient";

const movieAPI = {
  getMovieShowing: (numberPgae: number) => {
    // Khai báo hàm call API dữ liệu trả về là Movie[]
    return axiosClient.get("QuanLyPhim/LayDanhSachPhimPhanTrang", {
      params: {
        maNhom: "GP05 ",
        soTrang: numberPgae,
        soPhanTuTrenTrang: 8,
      }
    });
  },
  // get API dữ liệu trả về Movie{}
  getMovieDetails: (maPhim: number) => {
    return axiosClient.get("QuanLyPhim/LayThongTinPhim", {
      params: {
        maPhim: maPhim,
      },
    });
  },
  // get API dữ liệu trả về []
  getMovieShowTime: (maPhim: number) => {
    return axiosClient.get("QuanLyRap/LayThongTinLichChieuPhim", {
      params: {
        maPhim: maPhim,
      }
    })
  },
  getBanner: () => {
    return axiosClient.get("QuanLyPhim/LayDanhSachBanner");
  },

  //get API dữ liệu trả về []
  getSeatTicket: (maLichChieu: number) => {
    return axiosClient.get("QuanLyDatVe/LayDanhSachPhongVe", {
      params: {
        maLichChieu: maLichChieu
      }
    })
  },
  postSeatBooking: (thongTinDatVe: ListPay) => {
    return axiosClient.post("QuanLyDatVe/DatVe", thongTinDatVe)
  },
  getCinimax: () => {
    return axiosClient.get("QuanLyRap/LayThongTinLichChieuHeThongRap")
  },

  // Và những còn lại liên quan đến movie...
  addMovie: (movie: any) => {
    // Khi dữ liệu tải lên server có định dạng đặc biệt như File,..., ta cần chuyển thành dạng multipart/form-data bằng cách sử dụng đối tượng FormData
    const formData = new FormData();
    for (let key in movie) {
      formData.append(key, movie[key]);
    }
    formData.append("maNhom", "GP01");

    return axiosClient.post("QuanLyPhim/ThemPhimUploadHinh", formData);
  },
};

export default movieAPI;




