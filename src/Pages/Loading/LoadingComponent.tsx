import React from "react";
import LoadingStyles from "Playground/SCSS/Loading.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "configStore";

type Props = {};

const LoadingComponent = (props: Props) => {
  return <div className={LoadingStyles["loader"]}></div>;
};

export default LoadingComponent;
