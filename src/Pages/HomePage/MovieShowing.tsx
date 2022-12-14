import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "configStore";
import { getMovieShowing } from "Slices/movie";
import { getCinimax } from "Slices/cinimax";
import { Link, useNavigate } from "react-router-dom";
import Moment from "moment";
import Loading from "Pages/Loading/Loading";
import styles from "Playground/SCSS/MovieShowing.module.scss";
import { Tabs } from "antd";
import { PlayCircleOutlined } from "@ant-design/icons";
import { useWindowSize } from "usehooks-ts";
import ItemMovie from "./ItemMovie";

const { TabPane } = Tabs;

const MovieShowing = () => {
  const { width, height } = useWindowSize();
  const navigate = useNavigate();
  const [statusMovie, setStatusMovie] = useState("");
  const gotoDetail = (maPhim: number) => {
    navigate(`/movie-detail/${maPhim}`);
  };
  const { movies, error } = useSelector((state: RootState) => state.movie);

  const { cinimax, isLoading } = useSelector(
    (state: RootState) => state.cinimax
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getMovieShowing(1));
    dispatch(getCinimax());
  }, []);
  const ShowItemByNumber = (number: number) => {
    dispatch(getMovieShowing(number));
  };
  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    // TODO: Error component
    return <h1>{error}</h1>;
  }
  const checkMobile = window.innerWidth <= 450;

  let stt = [];
  for (let index = 1; index < movies.totalPages!; index++) {
    stt[index] = index;
  }
  const pageCurent = movies.currentPage;
  const checkLogin = (maLichChieuId: number) => {
    navigate(`/checkout/${maLichChieuId}`);
  };
  const ismobile = width < 450 ? "" : "grip-film";

  return (
    <main>
      <article>
        <section className="top-rated">
          <div className="container">
            <h2 className={`${styles["h2"]} ${styles["section-title"]}`}>
              DANH SÁCH PHIM
            </h2>

            <ul className="filter-list">
              <li>
                <button
                  onClick={() => setStatusMovie("")}
                  className="filter-btn"
                >
                  Tất cả
                </button>
              </li>
              <li>
                <button
                  onClick={() => setStatusMovie("hot")}
                  className="filter-btn"
                >
                  HOT
                </button>
              </li>
              <li>
                <button
                  onClick={() => setStatusMovie("dangChieu")}
                  className="filter-btn"
                >
                  Đang chiếu
                </button>
              </li>
              <li>
                <button
                  onClick={() => setStatusMovie("sapChieu")}
                  className="filter-btn"
                >
                  Sắp chiếu
                </button>
              </li>
            </ul>
            <ul className="movies-list">
              {movies.items.map((movie: any, index) => {
               
                if (statusMovie === "hot") {
                  if (movie.hot) {
                    return <ItemMovie key={index} {...movie} />;
                  }
                } else if (statusMovie === "dangChieu") {
                  if (movie.dangChieu) {
                    return <ItemMovie key={index} {...movie} />;
                  }
                } else if (statusMovie === "sapChieu") {
                  if (movie.sapChieu) {
                    return <ItemMovie key={index} {...movie} />;
                  }
                } else {
                  return <ItemMovie key={index} {...movie} />;
                }
              })}
            </ul>

            <ul className={styles["ul-page"]}>
              {stt.map((PageNumber) => {
                if (statusMovie === "") {
                  return (
                    <li key={PageNumber} className={styles["li-page"]}>
                      <button
                        className={
                          pageCurent === PageNumber
                            ? `${styles["btn-page"]} ${styles["btn-page-active"]}`
                            : styles["btn-page"]
                        }
                        onClick={() => ShowItemByNumber(PageNumber)}
                      >
                        {PageNumber}
                      </button>
                    </li>
                  );
                }
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
                <TabPane
                  tab={<img src={heThongRap.logo!} width={50} height={50} />}
                  key={index}
                >
                  <Tabs tabPosition={"top"}>
                    {heThongRap.lstCumRap.map((cumRapChieu, i) => {
                      return (
                        <TabPane
                          tab={
                            <div
                              key={heThongRap.maHeThongRap}
                              className={styles["card-cinima"]}
                            >
                              <img
                                src={heThongRap.logo!}
                                width={50}
                                height={50}
                              />
                              <div className={styles["card-detail"]}>
                                <b>{cumRapChieu.tenCumRap}</b>
                                <br />
                                <i>{cumRapChieu.diaChi}</i>
                              </div>
                            </div>
                          }
                          key={i}
                        >
                          <div>
                            <div className={styles["content-showTime"]}>
                              <Tabs tabPosition={"left"}>
                                {cumRapChieu.danhSachPhim.map(
                                  (lichChieuPhim, ilcp) => {
                                    if (ilcp < 5) {
                                      return (
                                        <TabPane
                                          tab={
                                            <div
                                              key={lichChieuPhim.maPhim}
                                              className={styles["card-film"]}
                                            >
                                              <img
                                                src={lichChieuPhim.hinhAnh!}
                                                width={50}
                                                height={50}
                                              />
                                              <div
                                                className={
                                                  styles["card-detail-film"]
                                                }
                                              >
                                                <b>{lichChieuPhim.tenPhim}</b>
                                                <br />
                                                <i>{`                                         
                                            ${
                                              lichChieuPhim.sapChieu
                                                ? "Sắp chiếu"
                                                : ""
                                            } -
                                            ${
                                              lichChieuPhim.dangChieu
                                                ? "Đang chiếu"
                                                : ""
                                            } -
                                            ${lichChieuPhim.hot ? "Hot" : ""} -
                                            
                                            `}</i>
                                              </div>
                                            </div>
                                          }
                                          key={ilcp}
                                        >
                                          <div className={styles[ismobile]}>
                                            {lichChieuPhim.lstLichChieuTheoPhim.map(
                                              (lst, indexlst) => {
                                                if (
                                                  indexlst <
                                                  (checkMobile ? 12 : 25)
                                                ) {
                                                  return (
                                                    <button
                                                      key={lst.maLichChieu}
                                                      style={{
                                                        margin: "auto",
                                                        width: "100%",
                                                      }}
                                                      onClick={() =>
                                                        checkLogin(
                                                          lst.maLichChieu!
                                                        )
                                                      }
                                                    >
                                                      <h1
                                                        className={
                                                          styles["h1Showtime"]
                                                        }
                                                      >
                                                        {" "}
                                                        {Moment(
                                                          lst.ngayChieuGioChieu
                                                        ).format("hh:mmA")}
                                                        -
                                                        {Moment(
                                                          lst.ngayChieuGioChieu
                                                        ).format(
                                                          "DD/MM/YYYY"
                                                        )}{" "}
                                                        -{" "}
                                                        {lst.giaVe?.toLocaleString(
                                                          "it-IT",
                                                          {
                                                            style: "currency",
                                                            currency: "VND",
                                                          }
                                                        )}
                                                      </h1>
                                                    </button>
                                                  );
                                                }
                                              }
                                            )}
                                          </div>
                                        </TabPane>
                                      );
                                    }
                                  }
                                )}
                              </Tabs>
                            </div>
                          </div>
                        </TabPane>
                      );
                    })}
                  </Tabs>
                </TabPane>
              );
            })}
          </Tabs>
        </div>
      </section>
      <section className="cta">
        <div className="container">
          <div className="title-wrapper">
            <h2 className="cta-title">CẬP NHẬT PHIM SIÊU HÓT</h2>
            <p className="cta-text">
              Vui lòng điền thông tin email để hoàn tất tiến trình.
            </p>
          </div>
          <form className="cta-form">
            <input
              type="email"
              name="email"
              required
              placeholder="Nhập email của bạn"
              className="email-field"
            />
            <button type="submit" className="cta-form-btn">
              Gửi
            </button>
          </form>
        </div>
      </section>
    </main>
  );
};

export default MovieShowing;
