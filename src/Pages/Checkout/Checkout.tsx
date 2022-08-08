import React, { Fragment, useState } from "react";
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'configStore'
import { getSeatTicket } from 'Slices/seatTicket'
import { Navigate, NavLink, useNavigate, useParams } from 'react-router-dom'
import stylesCheckout from 'Playground/SCSS/Checkout.module.scss'
import { ListSeatBooking } from 'Interface/listSeatBooking'
import { ListPay } from 'Interface/listPay'
import { SeatBookingSlice, DeleteBooking, DeleteAllBooking, postSeatBooking } from 'Slices/listSeatBooking'
import Swal from 'sweetalert2'
import Loading from "Pages/Loading/Loading";
import screen from "Playground/images/screen.png"



const Checkout = () => {
  const navigate = useNavigate();
  const { maLichChieu } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getSeatTicket(+maLichChieu!));
  }, []);
  const { seatTicket, isLoading, error } = useSelector(
    (state: RootState) => state.seatTicket
  );
  const { listSeatBooking, message } = useSelector(
    (state: RootState) => state.listSeatBooking
  );
  //"selectSeat"  

  const handleSelect = (seatSelected: ListSeatBooking) => {
    dispatch(SeatBookingSlice(seatSelected));

  }
  const handleDelete = (seatID: number) => {
    dispatch(DeleteBooking(seatID))
  }
  const handelDeleteall = () => {
    dispatch(DeleteAllBooking());
  }

  const thongTinDatVe: ListPay = {
    maLichChieu: +maLichChieu!,
    danhSachVe: listSeatBooking,
  };

  const handlePaySeat = (thongTinDatVe: ListPay) => {
    if (thongTinDatVe.danhSachVe.length !== 0) {
      Swal.fire({
        title: 'Bạn chắc chắn muốn đặt?',
        showDenyButton: true,
        confirmButtonText: 'Yes',
        denyButtonText: 'No',
        customClass: {
          actions: 'my-actions',
          cancelButton: 'order-1 right-gap',
          confirmButton: 'order-2',
          denyButton: 'order-3',
        }
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(postSeatBooking(thongTinDatVe));
          dispatch(getSeatTicket(+maLichChieu!))
          navigate("/booked")


        } else if (result.isDenied) {
          Swal.fire('Vui lòng lựa lại ghế', '', 'info')
          dispatch(DeleteAllBooking());
        }
      })
    } else {
      Swal.fire({
        icon: 'error',
        title: 'CÓ LỖI XẢY RA',
        text: 'Bạn chưa đặt vé, vui lòng đặt vé!',

      })
    }


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
        <div className="container">

          <div className="service-banner">
            <div className={stylesCheckout["list-seat"]}>
              <img src={screen} alt="" />
            </div>
            <div className={stylesCheckout["list-seat"]}>
              {seatTicket.danhSachGhe.map((danhSachGhe, index) => {
                let isSelected = "";
                let indexSeatBooking = listSeatBooking.findIndex((seatBooked) => danhSachGhe.maGhe === seatBooked.maGhe)
                if (indexSeatBooking != -1) {
                  isSelected = "selectSeat"
                }

                return (

                  <Fragment key={danhSachGhe.maGhe}>
                    <button onClick={() => handleSelect(danhSachGhe)} className={`btn-ticket ${danhSachGhe.loaiGhe} ${danhSachGhe.daDat} ${isSelected} `} disabled={danhSachGhe.daDat}>{danhSachGhe.daDat ? "X" : danhSachGhe.stt} </button>
                   
                  </Fragment>

                );
              })}
            </div>
            <div className={stylesCheckout["descri-seat"]}>
              <div className={stylesCheckout["seat"]}>
                <span className="btn-ticket Vip"></span>
                <span>Ghế Vip</span>
              </div>
              <div className={stylesCheckout["seat"]}>
                <span className="btn-ticket Thuong"></span>
                <span>Ghế Thường</span>
              </div>
              <div className={stylesCheckout["seat"]}>
                <span className="btn-ticket Vip true"></span>
                <span>Ghế Vip<br /> Đã Bán</span>
              </div>
              <div className={stylesCheckout["seat"]}>
                <span className="btn-ticket Thuong true"></span>
                <span>Ghế Thường<br /> Đã Bán</span>
              </div>


            </div>
          </div>

          <div className="service-content">
            <p className="service-subtitle">Danh sách vé được chọn</p>
            <h2 className={`h2 service-title ${stylesCheckout["title-Film"]}`}>{seatTicket.thongTinPhim.tenPhim} <span className={stylesCheckout["title-date"]}>({seatTicket.thongTinPhim.gioChieu} - {seatTicket.thongTinPhim.ngayChieu})</span> </h2>
            <p className="service-text">
              <span className={stylesCheckout["detail-cinimax-title"]}>Cụm rạp :</span><span className={stylesCheckout["detail-cinimax"]} > {seatTicket.thongTinPhim.tenCumRap} - {seatTicket.thongTinPhim.tenRap} - {seatTicket.thongTinPhim.diaChi}.</span>
            </p>
            <ul className="service-list">
              <li>
                <div className="service-card">
                  <div className="card-content">
                    <h3 className="h3 card-title color-pay">DANH SÁCH GHẾ ĐÃ CHỌN</h3>
                    <p className="card-text ">
                      {listSeatBooking.map((ghe) => {
                        return (
                          <span key={ghe.maGhe} >Số ghế : {ghe.stt} ,  vé : {ghe.loaiGhe} , giá vé : {ghe.giaVe!.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })} <button className={stylesCheckout["delete-Booking"]} onClick={(() => handleDelete(ghe.maGhe!))} >X</button> </span>
                        );
                      })}
                    </p>
                    {listSeatBooking.length > 0 ? <button className={stylesCheckout["btn-primary"]} onClick={() => handelDeleteall()}>xóa ghế đã đặt</button> : ""}
                  </div>
                </div>
              </li>
              <li>
                <div className="service-card">

                  <div className="card-content total-content">
                    <h3 className="h3 card-title color-pay total">TỔNG TIỀN : {listSeatBooking.reduce((totalPrice, ghe) => totalPrice + ghe.giaVe!, 0).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}  </h3><button onClick={() => handlePaySeat(thongTinDatVe)} className={stylesCheckout["btn-primary"]}>Thanh Toán</button>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div >
      </section >
    </div >



  );
};

export default Checkout;
