import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "configStore";
import { getMovieShowing } from "Slices/movie";
import { getCinimax } from "Slices/cinimax";
import { Link, useNavigate } from 'react-router-dom'
import Moment from 'moment';
import Loading from "Pages/Loading/Loading";
import styles from 'Playground/SCSS/MovieShowing.module.scss'
import { Tabs } from "antd";



const { TabPane } = Tabs;

const MovieShowing = () => {
  const navigate = useNavigate();
  const gotoDetail = (maPhim: number) => {
    navigate(`/movie-detail/${maPhim}`);
  };
  const { movies, isLoading, error } = useSelector(
    (state: RootState) => state.movie
  );
  const { cinimax, } = useSelector(
    (state: RootState) => state.cinimax
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getMovieShowing(1));
    dispatch(getCinimax());
  }, []);
  const ShowItemByNumber = (number: number) => {
    dispatch(getMovieShowing(number));
  }

  if (isLoading) {
    // TODO: Loading component
    return (
      <Loading />
    );
  }

  if (error) {
    // TODO: Error component
    return <h1>{error}</h1>
  }
  const checkMobile = window.innerWidth <= 550
  let stt = []
  for (let index = 1; index < movies.totalPages!; index++) {
    stt[index] = index;

  }
  const checkLogin = (maLichChieuId: number) => {
    navigate(`/checkout/${maLichChieuId}`);
  }

  return (

    <main>
      <article>
        <section className="top-rated">
          <div className="container">

            <h2 className="h2 section-title">DANH SÁCH PHIM</h2>
            <ul className="filter-list">
              <li >
                <button className="filter-btn">Movies</button>
              </li>
              <li>
                <button className="filter-btn">TV Shows</button>
              </li>
              <li>
                <button className="filter-btn">Documentary</button>
              </li>
              <li>
                <button className="filter-btn">Sports</button>
              </li>
            </ul>
            <ul className="movies-list">
              {movies.items.map((movie: any) => {
                Moment.locale('en');
                const date = movie.ngayKhoiChieu
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
                        <div className="badge badge-outline">{Moment(date).format('DD-MM-YYYY')}</div>

                        <div className="rating">

                          <data className="badge badge-outline">Rank({movie.danhGia}*)</data>
                        </div>
                      </div>
                    </div>

                  </li>

                );
              })}

            </ul>
            <ul className={styles["ul-page"]}>

              {stt.map((PageNumber, index) => {
                return (<li key={PageNumber} className={styles["li-page"]}> <button className={styles["btn-page"]} onClick={() => ShowItemByNumber(PageNumber)}>{PageNumber}</button></li>)

              })}

            </ul>


          </div>

        </section>

      </article>
      <section className="showtime-Opent">
        <div className="container">
          <h2 className="h2 section-title">LỊCH CHIẾU PHIM</h2>
          <Tabs tabPosition={"top"}>
            {cinimax.map((heThongRap, index) => {
              return (
                <TabPane tab={<img src={heThongRap.logo!} width={50} height={50} />} key={index}>
                  <Tabs tabPosition={"top"}>
                    {heThongRap.lstCumRap.map((cumRapChieu, i) => {
                      return (
                        <TabPane tab={
                          <div key={heThongRap.maHeThongRap} className={styles["card-cinima"]}>
                            <img src={heThongRap.logo!} width={50} height={50} />
                            <div className={styles["card-detail"]}>
                              <b>{cumRapChieu.tenCumRap}</b><br />
                              <i>{cumRapChieu.diaChi}</i>
                            </div>

                          </div>
                        } key={i}>

                          <div >

                            <div className={styles["content-showTime"]}>
                              <Tabs tabPosition={"left"}>
                                {cumRapChieu.danhSachPhim.map((lichChieuPhim, ilcp) => {
                                  if (ilcp < 5) {
                                    return (

                                      <TabPane tab={
                                        <div key={lichChieuPhim.maPhim} className={styles["card-film"]}>
                                          <img src={lichChieuPhim.hinhAnh!} width={50} height={50} />
                                          <div className={styles["card-detail-film"]}>
                                            <b>{lichChieuPhim.tenPhim}</b><br />
                                            <i>{`                                         
                                            ${lichChieuPhim.sapChieu ? "Sắp chiếu" : ""} -
                                            ${lichChieuPhim.dangChieu ? "Đang chiếu" : ""} -
                                            ${lichChieuPhim.hot ? "Hot" : ""} -
                                            
                                            `}</i>
                                          </div>
                                        </div>
                                      } key={ilcp}>
                                        {lichChieuPhim.lstLichChieuTheoPhim.map((lst, indexlst) => {
                                          if (indexlst < (checkMobile ? 12 : 18)) {
                                            return (
                                              <button key={lst.maLichChieu} style={{ margin: "auto", width: "100%" }} onClick={() => checkLogin(lst.maLichChieu!)}><h1 className={styles["h1Showtime"]}> {Moment(lst.ngayChieuGioChieu).format('hh:mmA')}-{Moment(lst.ngayChieuGioChieu).format('DD/MM/YYYY')} - {lst.giaVe?.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</h1></button>
                                            )
                                          }

                                        })}
                                      </TabPane>

                                    )
                                  }

                                })}
                              </Tabs>
                            </div>

                          </div>
                        </TabPane>

                      )
                    })}
                  </Tabs>
                </TabPane>
              )
            })}


          </Tabs>
        </div>
      </section >

    </main>
  );
};

export default MovieShowing;
