
import { Carousel } from 'antd';
import React, { useEffect, useState } from "react";
import styles from 'Playground/SCSS/Banner.module.scss';
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'configStore'
import { getBanner } from 'Slices/getBanner'

const Banner = () => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getBanner());
  }, [])
  const { banner, isLoading, error } = useSelector(
    (state: RootState) => state.banner
  )
  const handleDetail = (maPhim: number) => {

  }
  return (
    <div className={styles['carousel-content']}>
      <Carousel dots={false} autoplay>

        {banner.map((banners) => {
          return (

            <img key={banners.maPhim} className={styles['img-Banner']} src={banners.hinhAnh!} alt="" />


          )
        })}
      </Carousel>
    </div>



  );
};

export default Banner;
