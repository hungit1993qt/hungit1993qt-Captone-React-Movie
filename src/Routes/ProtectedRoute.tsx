import { RootState, AppDispatch} from "configStore";
import { useSelector,useDispatch } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
import {User} from 'Interface/user'
import {logOut} from 'Slices/auth'

interface Props {
  children: JSX.Element;
}
const ProtectedRoute = ({ children }: Props) => {
  // Kiểm tra xem user đã đăng nhập hay chưa
  const getLocalStorage:User = JSON.parse(localStorage.getItem("user") as string) || null;
  const { auth } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  if (!getLocalStorage) {
    // Chưa đăng nhập
    return <Navigate to="/login" />;
  }
  // {else if (getLocalStorage) {
  //   if(getLocalStorage.maLoaiNguoiDung === "QuanTri"){      
  //     dispatch(logOut());
  //     return <Navigate to="/login/" />;
  //   }    
  // }}

  // Đã đăng nhập
  return children;
};

export default ProtectedRoute;
