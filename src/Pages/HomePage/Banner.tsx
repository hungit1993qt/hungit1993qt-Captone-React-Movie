
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
    <Carousel autoplay>
      {banner.map((banners) => {
        return (

          <img className={styles['img-Banner']} src={banners.hinhAnh!} alt="" />


        )
      })}
    </Carousel>


  );
};

export default Banner;
