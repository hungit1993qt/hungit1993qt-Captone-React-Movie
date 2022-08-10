import React, { useEffect, useState } from "react";
import styles from 'Playground/SCSS/Register.module.scss'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string } from "yup";
import { RegisterValue } from 'Interface/register'
import { AppDispatch, RootState } from 'configStore'
import { useDispatch, useSelector } from 'react-redux'
import { postRegisterUser } from 'Slices/register'
import { postUserLogin } from 'Slices/auth'
import { useNavigate } from 'react-router-dom'
import { LoginValues } from "Interface/loginValue"

import Swal from 'sweetalert2'

// Register fields: taiKhoan, matKhau, email, hoTen, soDt

// validation schema
const schema = object({
  taiKhoan: string()
    .required("Tài khoản không được để trống")
    .matches(
      /^[a-zA-Z0-9]{5,}$/,
      "Tài khoản chỉ gồm chữ hoa, thường, số và ít nhất 5 kí tự"
    ),
  matKhau: string()
    .required("Mật khẩu không được để trống")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
      "Mật khẩu ít nhất một chữ cái, một số và ít nhất 8 kí tự"
    ),
  email: string()
    .required("Email không được để trống")
    .email("Email không đúng định dạng"),
  hoTen: string().required("Họ tên không được để trống"),
  soDt: string().required("Số điện thoại không được để trống"),
});




const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterValue>({
    // cấu hình validation bằng yup schema
    resolver: yupResolver(schema),
  });
  const getRegisterLocalstrage: RegisterValue = JSON.parse(localStorage.getItem("registerUser") as string) || null
  const [render, setRender] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>()
  const { RegisterValue, isLoading, error } = useSelector(
    (state: RootState) => state.RegisterValue

  );
  const onSubmit = (values: RegisterValue) => {
    Swal.fire({
      title: 'Bạn muốn đăng ký tài khoản với thông tin vừa nhập?',
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
        dispatch(postRegisterUser(values));

      } else if (result.isDenied) {
        Swal.fire('Tài khoản chưa được đăng ký', '', 'info')
      }
    })




  };


  if (RegisterValue) {
    if (getRegisterLocalstrage) {
      if (getRegisterLocalstrage.matKhau) {
        const registed = {
          taiKhoan: getRegisterLocalstrage.taiKhoan!,
          matKhau: getRegisterLocalstrage.matKhau
        }
        dispatch(postUserLogin(registed));
        navigate("/");
        localStorage.removeItem("registerUser");

      }
    }
  }



  return (
    <main>
      <article>
        <section className={styles.loginRank}>
          <div className="container">
            <div>
              <div className={styles.background}>
                <div className={styles.shape} />

                <div className={styles.shape} />
              </div>
              <form className={styles['form-register']} onSubmit={handleSubmit(onSubmit)}>
                <h3 >ĐĂNG KÝ</h3>
                <div>
                  <label>Tài Khoản</label>
                  <input type="text" {...register("taiKhoan")} />
                  {errors.taiKhoan && <span>{errors.taiKhoan?.message}</span>}
                </div>
                <div>
                  <label>Mật Khẩu</label>
                  <input type="password" {...register("matKhau")} />
                  {errors.matKhau && <span>{errors.matKhau?.message}</span>}
                </div>
                <div>
                  <label>Email</label>
                  <input type="email" {...register("email")} />
                  {errors.email && <span>{errors.email?.message}</span>}
                </div>
                <div>
                  <label>Họ Tên</label>
                  <input type="text" {...register("hoTen")} />
                  {errors.hoTen && <span>{errors.hoTen?.message}</span>}
                </div>
                <div>
                  <label>Số Điện Thoại</label>
                  <input type="text" {...register("soDt")} />
                  {errors.soDt && <span>{errors.soDt?.message}</span>}
                </div>
                <div className={styles["btn-gr"]}>
                  <button className={styles["btnRegister"]}>Đăng ký</button>
                </div>

              </form>
            </div>
          </div>
        </section>
      </article>
    </main>
  );
};

export default Register;
