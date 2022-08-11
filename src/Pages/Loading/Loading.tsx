import React from "react";
import LoadingStyles from "Playground/SCSS/Loading.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "configStore";
import LoadingComponent from "./LoadingComponent";

type Props = {};

const Loading = (props: Props) => {
  const { isLoading } = useSelector((state: RootState) => state.isLoading);
  return <div>{isLoading ? <LoadingComponent /> : ""}</div>;
};

export default Loading;
