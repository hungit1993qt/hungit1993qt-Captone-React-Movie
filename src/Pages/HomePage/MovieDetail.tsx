import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "configStore";
import { getMovieDetails } from "Slices/movieDetail";
import { Link, useNavigate, useParams } from 'react-router-dom'
import Moment from 'moment';
import Loading from "Pages/Loading/Loading";
import { getMovieShowTime } from "Slices/showTime";
import styleDetail from 'Playground/SCSS/movieDetails.module.scss'
import Swal from 'sweetalert2';
import { Tabs } from "antd";
import { useWindowSize } from 'usehooks-ts'
import { number } from "yup";



const { TabPane } = Tabs;


const MovieDetail = () => {
    const { width, height } = useWindowSize()
    const navigate = useNavigate();
    const checkLogin = (maLichChieuId: number) => {
        navigate(`/checkout/${maLichChieuId}`);
    }
    const [opent, setOpent] = useState(false);
    const [isClickShowRap, setIsClickShowRap] = useState(false);
    const [isClickShowHTRap, setisClickShowHTRap] = useState(false);
    const { maPhim } = useParams()
    const { movies, isLoading, error } = useSelector(
        (state: RootState) => state.detail
    );
    const { showtimes } = useSelector(
        (state: RootState) => state.showtime
    );
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        dispatch(getMovieDetails(+maPhim!));
        dispatch(getMovieShowTime(+maPhim!))
    }, []);
    


    if (error) {
        // TODO: Error component
        return <h1>{error}</h1>;
    }




    const setHight = width < 450 ? "300px" : "600px";
    const listFilCinimax = width < 450 ? "top" : "left";
    Moment.locale('en');
    const time = showtimes.heThongRapChieu[0].cumRapChieu[0].lichChieuPhim[0].thoiLuong;
    const date = showtimes.ngayKhoiChieu;
    const biDanh = showtimes.biDanh;
    const tenPhim = showtimes.tenPhim;
    const moTa = showtimes.moTa;
    const hinhAnh = showtimes.hinhAnh;
    const maPhims = showtimes.maPhim;
    const Trainer = showtimes.trailer;
    const train = (Trainer: string) => {
        var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
        var match = Trainer.match(regExp);
        return (match && match[7].length == 11) ? match[7] : false;
    }
    const idTrainer = train(Trainer);
    const showTrainer = () => {
        Swal.fire({
            title: `<strong>${tenPhim} Trainer</strong>`,

            html:
                `<iframe width="100%" height=${setHight} src="https://www.youtube.com/embed/${idTrainer}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`,

            width: "100%",
            focusConfirm: false,

        })
    }
    return (
        <div>
            <section className="movie-detail">
                <div className="container">
                    <figure className="movie-detail-banner">
                        <img src={hinhAnh} alt={tenPhim} />
                        <button onClick={() => showTrainer()} className="play-btn" >

                        </button>
                    </figure>
                    <div className="movie-detail-content">
                        <p className="detail-subtitle">{biDanh}</p>
                        <h1 key={maPhims} className="h1 detail-title">
                            {tenPhim}
                        </h1>
                        <div className="meta-wrapper">
                            <div className="badge-wrapper">
                                <div className="badge badge-fill">{maPhim}</div>
                                <div className="badge badge-outline">HD</div>
                            </div>
                            <div className="ganre-wrapper">
                                <a href="#">Comedy,</a>
                                <a href="#">Action,</a>
                                <a href="#">Adventure,</a>
                                <a href="#">Science Fiction</a>
                            </div>
                            <div className="date-time">
                                <div>
                                    <time>{Moment(date).format('DD-MM-YYYY')}</time>
                                </div>
                                <div>
                                    <time>{time}p</time>
                                </div>
                            </div>
                        </div>
                        <p className="storyline">
                            {moTa}
                        </p>
                        <div className="details-actions">

                            <button className="btn btn-primary" onClick={() => showTrainer()}><span>Xem Trailer</span></button>

                            <button onClick={() => setOpent(!opent)} className="btn btn-primary" >
                                <span>Mua vé</span>
                            </button>
                        </div>
                    </div>
                </div>
            </section>
            <section className={opent ? styleDetail["showtime-Opent"] : styleDetail["showtime-close"]}>
                <div className="container">
                    <h2 className="h2 section-title">LỊCH CHIẾU PHIM</h2>
                    <p className={styleDetail["showtime-subtitle"]}>" {tenPhim}"</p>
                    <Tabs tabPosition={listFilCinimax}>
                        {showtimes.heThongRapChieu.map((heThongRapChieu, index) => {
                            return (
                                <TabPane tab={<img src={heThongRapChieu.logo} width={50} height={50} />} key={index}>
                                    <Tabs tabPosition={listFilCinimax}>
                                        {heThongRapChieu.cumRapChieu.map((cumRapChieu, idx) => {
                                            return (
                                                <TabPane tab={
                                                    <div className={styleDetail["title-cinma"]}> <img className={styleDetail["title-img"]} src={heThongRapChieu.logo} width={50} height={50} />
                                                        <h1 className={styleDetail["title-start"]}>{cumRapChieu.tenCumRap} <br /> {cumRapChieu.diaChi}</h1>
                                                    </div>} key={idx}>
                                                    <div key={cumRapChieu.maCumRap}>
                                                        <div className={styleDetail["content-showTime"]}>
                                                            {cumRapChieu.lichChieuPhim.map((lichChieuPhim, index) => {
                                                                if (index < 6) {
                                                                    return (
                                                                        <button key={lichChieuPhim.maLichChieu} onClick={() => checkLogin(lichChieuPhim.maLichChieu)} className={styleDetail["timeshows"]}>{Moment(lichChieuPhim.ngayChieuGioChieu).format(' HH : mm A')}<br />{Moment(lichChieuPhim.ngayChieuGioChieu).format('DD-MM-YYYY')}</button>
                                                                    )
                                                                }

                                                            })}
                                                        </div>





                                                    </div>
                                                </TabPane>)
                                        })}</Tabs>
                                </TabPane>
                            )
                        })}


                    </Tabs>
                </div>
            </section >

        </div >



    )
}

export default MovieDetail