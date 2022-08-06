import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "configStore";
import { getMovieShowing } from "Slices/movie";
import { Link, useNavigate } from 'react-router-dom'
import Moment from 'moment';
import Loading from "Pages/Loading/Loading";


const MovieShowing = () => {
  const navigate = useNavigate();
  const gotoDetail = (maPhim: number) => {
    navigate(`/movie-detail/${maPhim}`);
  };
  const { movies, isLoading, error } = useSelector(
    (state: RootState) => state.movie
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getMovieShowing());
  }, []);


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

  
  return (

    <main>
      <article>
        <section className="top-rated">
          <div className="container">
            <p className="section-subtitle">Online Streaming</p>
            <h2 className="h2 section-title">Top Rated Movies</h2>
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
              {movies.map((movie: any) => {

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
                        <div className="duration">

                          <time className="badge badge-outline" >{Math.floor(Math.random() * 100) + 90} Phút</time>
                        </div>
                        <div className="rating">

                          <data className="badge badge-outline">Rank({movie.danhGia}*)</data>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}

            </ul>
          </div>
        </section>

      </article>
    </main>
  );
};

export default MovieShowing;
