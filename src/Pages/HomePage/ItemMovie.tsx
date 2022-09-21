import React from "react";
import Moment from "moment";
import { useNavigate } from "react-router-dom";
type Props = {
  maPhim: number;
  tenPhim: string;
  biDanh: string;
  trailer: string;
  hinhAnh: string;
  moTa: string;
  maNhom: string;
  hot: boolean;
  dangChieu: boolean;
  sapChieu: boolean;
  ngayKhoiChieu: String;
  danhGia: number;
};

const ItemMovie = (movie: Props) => {
  const navigate = useNavigate();
  const gotoDetail = (maPhim: number) => {
    navigate(`/movie-detail/${maPhim}`);
  };
  Moment.locale("en");
  const date: any = movie.ngayKhoiChieu;
  return (
    <li key={movie.maPhim}>
      <div className="movie-card">
        <button onClick={() => gotoDetail(movie.maPhim)}>
          <figure className="card-banner">
            <img src={movie.hinhAnh} alt={movie.tenPhim} />
          </figure>
        </button>
        <div className="title-wrapper">
          <button onClick={() => gotoDetail(movie.maPhim)}>
            <h3 className="card-title">{movie.tenPhim}</h3>
          </button>
        </div>
        <div className="card-meta">
          <div className="badge badge-outline">
            {Moment(date).format("DD-MM-YYYY")}
          </div>

          <div className="rating">
            <data className="badge badge-outline">Rank({movie.danhGia}*)</data>
          </div>
        </div>
      </div>
    </li>
  );
};

export default ItemMovie;
