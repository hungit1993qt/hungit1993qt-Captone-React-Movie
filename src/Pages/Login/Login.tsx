// Một số thư viện làm việc với form trong React: formik, react-final-form, react-hook-form
import styles from 'Playground/SCSS/Login.module.scss'
import { useForm, FieldErrors } from "react-hook-form";
import { LoginValues } from "Interface/loginValue"
import { useSelector, useDispatch } from 'react-redux';
import { postUserLogin, logOut } from "Slices/auth";
import { AppDispatch, RootState } from "configStore";
import { Navigate, NavLink, useNavigate, useParams } from "react-router-dom";
import { useEffect } from 'react'
import { User } from 'Interface/user'
import Loading from 'Pages/Loading/Loading'

type Props = {};

const Login = (props: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValues>({
    // defaultValues: Khai báo giá trị mặc định cho các input trong form
    defaultValues: {
      taiKhoan: "",
      matKhau: "",
    },
    // mode: cách validation được trigger (default là submit)

  });
  const getLocalStorage = JSON.parse(localStorage.getItem("user") as string) || null;
  const navigate = useNavigate()
  const { auth, isLoading, error } = useSelector(
    (state: RootState) => state.auth

  );
  const dispatch = useDispatch<AppDispatch>();
  const onError = (errorF: FieldErrors<LoginValues>) => {
    console.log(errorF);
  };
  const onSubmit = (values: LoginValues) => {
    dispatch(postUserLogin(values));

  };

  if (error) {
    // TODO: Error component
    return (<h1>{error}</h1>)
  }


  // haiminh454
  // minhhai454
  if (auth) {
    if (getLocalStorage) {
      if (getLocalStorage.maLoaiNguoiDung === "QuanTri") {
        
        dispatch(logOut());
        alert("Sai loai tai khoan");
        navigate("/login")

      } else {
        navigate(-1);
      }
    }

  } else {
    <Navigate to="/login" />
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
              <form onSubmit={handleSubmit(onSubmit, onError)}>
                <h3>Đăng Nhập</h3>
                <label htmlFor="username">Tài Khoản</label>
                <input placeholder=" Tài Khoản"
                  type="text"
                  {...register("taiKhoan", {
                    // validations
                    required: {
                      value: true,
                      message: "Tài khoản không được để trống",
                    },
                    pattern: {
                      value: /^[a-zA-Z0-9]{5,}$/,
                      message:
                        "Tài khoản bao gồm các kí tự hoa, thường, số và ít nhất 5 kí tự",
                    },
                  })} id="username" />
                {errors.taiKhoan && <span className="">{errors.taiKhoan?.message}</span>}
                <label htmlFor="password">Mật Khẩu</label>
                <input type="password"
                  placeholder=" Mật Khẩu"
                  {...register("matKhau", {
                    required: {
                      value: true,
                      message: "Mật khẩu không được để trống",
                    },
                    pattern: {
                      value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                      message:
                        "Mật khẩu ít nhất một chữ cái, một số và ít nhất 8 kí tự",
                    },
                  })} id="password" />
                {errors.matKhau && <span className="">{errors.matKhau?.message}</span>}
                <div className={styles["btn-gr"]}>
                  <button className={styles.btnLogin}>Log In</button>
                  <NavLink to="/register" className={styles.btnLoginNav}>Register</NavLink>
                </div>
              </form>
              
            </div>
          </div>
        </section>
      </article>
    </main>
  );
};

export default Login;
