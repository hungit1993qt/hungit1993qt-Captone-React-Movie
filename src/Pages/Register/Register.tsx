import React from "react";
import styles from 'Playground/SCSS/Register.module.scss'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string } from "yup";
import { RegisterValue } from 'Interface/register'
import { AppDispatch, RootState } from 'configStore'
import { useDispatch, useSelector } from 'react-redux'
import { postRegisterUser } from 'Slices/register'
import { useNavigate } from 'react-router-dom'

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
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>()
  const onSubmit = (values: RegisterValue) => {
    console.log(values)
    dispatch(postRegisterUser(values))
    if (getRegisterLocalstrage != null) {
     navigate("/login");
    }else{
      console.log("khác null")
    }


  };

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
              <form onSubmit={handleSubmit(onSubmit)}>
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
                  <button  className={styles.btnLogin}>Đăng ký</button>
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
