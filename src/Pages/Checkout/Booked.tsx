
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'configStore';
import { getBookedUser } from 'Slices/inforBooked';
import Swal from 'sweetalert2';
import styles from 'Playground/SCSS/Booked.module.scss'
import Moment from 'moment';
import { getMovieDetails } from "Slices/movieDetail";
import Loading from "Pages/Loading/Loading";
const Booked = () => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getBookedUser())
    // dispatch(getMovieDetails())
  }, []);
  const { inforBookeds, isLoading, error } = useSelector(
    (state: RootState) => state.inforBooked
  );

  const { movies } = useSelector(
    (state: RootState) => state.detail
  );
  console.log(movies)
  const showMoreInforFilm = (tenPhim: string, hinhAnh: string, ngayDat: string, giaVe: number, thoiLuong: number) => {
    Swal.fire({
      title: `${tenPhim}`,
      text: `
      Ngày đặt: ${Moment(ngayDat).format('DD:MM:YYYY')}, 
      Giá: ${giaVe!.toLocaleString('it-IT', { style: 'currency', currency: 'vnd' })},
      Thời lượng: ${thoiLuong} 
      `,
      imageUrl: `${hinhAnh}`,
      imageWidth: 400,
      imageAlt: 'Custom image',
      width: 535

    })

  }
  const showMoreInforSeat = (tenGhe: string, tenCumRap: string, tenRap: string, ngayChieu: string) => {
    Swal.fire(`
    Tên ghế: ${tenGhe} </br>
    Cụm Rạp: ${tenCumRap} </br>
    Tên Rạp: ${tenRap} </br>
    Ngày Chiếu: ${Moment(ngayChieu).format('hh : mm DD:MM:YYYY')}
    `)
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
  return (
    <div>
      <section className="service">
        <div>
          <h1><span className={styles["blue"]}></span>DANH SÁCH ĐÃ ĐẶT VÉ<span className={styles["blue"]}></span> </h1>
        </div>
        <table className={styles['container']}>
          <thead>
            <tr >
              <th>THÔNG TIN PHIM</th>
              <th>THÔNG TIN GHẾ</th>
            </tr>
          </thead>
          <tbody>
            {/* {Moment(infor.ngayDat).format('DD-MM-YYYY')} */}
            {inforBookeds.thongTinDatVe?.map((film) => {
              return (
                <tr className={styles['trboder']} key={film.maVe}>
                  <td><button className={styles['btn-Show-More-Infor']} onClick={() => { showMoreInforFilm(film.tenPhim!, film.hinhAnh!, film.ngayDat!, film.giaVe!, film.thoiLuongPhim!) }} >{film.tenPhim}</button></td>
                  <td > {film.danhSachGhe.map((ghe) => {
                    return (<button key={ghe.maGhe} className={styles['btn-Show-More-Infor-Seat']} onClick={() => { showMoreInforSeat(ghe.tenGhe!, ghe.tenHeThongRap!, ghe.tenRap!, film.ngayDat!) }} >{ghe.tenGhe}</button>)
                  })}
                  </td>

                </tr>

              );
            })}

          </tbody>
        </table>
      </section>
    </div>


  );
};
export default Booked;
