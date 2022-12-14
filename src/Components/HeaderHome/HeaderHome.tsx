import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "configStore";
import { logOut } from "Slices/auth";
import { User } from "Interface/user";
import Swal from "sweetalert2";
//tsrafce
import { NavLink } from "react-router-dom";
import React, { useState, useRef, useEffect } from "react";
import stylesHeader from "Playground/SCSS/Header.module.scss";
import { useOnClickOutside } from "usehooks-ts";
type Props = {};

const HeaderHome = (props: Props) => {
  const [onscrolled, setOnscrolled] = useState(false);

  useEffect(() => {
    const onscroll = () => {
      if (window.scrollY > 10) {
        setOnscrolled(true);
      } else {
        setOnscrolled(false);
      }
    };
    window.addEventListener("scroll", onscroll);
  }, []);
  const { auth } = useSelector((state: RootState) => state.auth);
  const getLocalStorage: User =
    JSON.parse(localStorage.getItem("user") as string) || null;
  const dispatch = useDispatch<AppDispatch>();
  const Logout = () => {
    dispatch(logOut());
  };
  const Login = () => {};
  const [Active, setActive] = useState(false);

  const ref = useRef(null);
  const handleClickOutside = () => {
    // console.log('clicked outside')
    setActive(false);
  };

  const handleClickInside = () => {
    // Your custom logic here
    // console.log('clicked inside')
    setActive(true);
  };

  useOnClickOutside(ref, handleClickOutside);

  return (
    <header className={onscrolled ? `header active ` : `header `}>
      <div className="container">
        <div className="overlay" />
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "logo activeLink" : "logo")}
        >
          <img className="imgLogo" src="../../logo.svg" alt="Filmlane logo" />
        </NavLink>
        <div className="header-actions">
          
          

          <NavLink to={"/booked"}>
            <h3 className={stylesHeader["title-user"]}>
              {auth ? auth.hoTen : ""}
            </h3>
          </NavLink>
          <NavLink to={auth ? "/" : "login"}>
            <button
              onClick={() => {
                auth ? Logout() : Login();
              }}
              className="btn btn-primary"
            >
              {getLocalStorage ? "Log out" : "Sign in"}
            </button>
          </NavLink>
        </div>
        <button
          className={Active ? "menu-open-btn active" : "menu-open-btn"}
          ref={ref}
          onClick={Active ? handleClickOutside : handleClickInside}
        >
          <span className="one"></span>
          <span className="two"></span>
          <span className="three"></span>
        </button>
        <nav className={Active ? "navbar active" : "navbar"}>
          <div className="navbar-top">
            <NavLink to="/" className="logo">
              <img
                className="imgLogo"
                src="../../logo.svg"
                alt="Filmlane logo"
              />
            </NavLink>

            <button
              className={Active ? "menu-open-btn active" : "menu-open-btn"}
              onClick={() => setActive(false)}
            >
              <span className={Active ? "one active" : "one"}></span>
              <span className={Active ? "two active" : "two"}></span>
              <span className={Active ? "three active" : "three"}></span>
            </button>
          </div>
          <ul className="navbar-list">
            <li className={stylesHeader["li-submenu"]}>
              <NavLink
                to={"booked"}
                className={({ isActive }) =>
                  isActive ? "navbar-link activeLink" : "navbar-link"
                }
              >
                <h3 className={stylesHeader["title-user"]}>
                  {auth ? auth.hoTen : ""}
                </h3>
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/"}
                className={({ isActive }) =>
                  isActive ? "navbar-link activeLink" : "navbar-link"
                }
              >
                Home
              </NavLink>
            </li>

            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "navbar-link activeLink" : "navbar-link"
                }
                to={"about"}
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"contact"}
                className={({ isActive }) =>
                  isActive ? "navbar-link activeLink" : "navbar-link"
                }
              >
                Contact
              </NavLink>
            </li>

            <li className={stylesHeader["li-submenu"]}>
              <NavLink className="navbar-link" to={auth ? "/" : "login"}>
                <button
                  onClick={() => {
                    auth ? Logout() : Login();
                  }}
                  className={stylesHeader["btn-submenu"]}
                >
                  {getLocalStorage ? "Log out" : "Sign in"}
                </button>
              </NavLink>
            </li>
          </ul>

          <ul className="navbar-social-list">
            <li>
              <a href="#" className="navbar-social-link">
              <i className="fab fa-twitter-square"></i>
              </a>
            </li>
            <li>
              <a href="#" className="navbar-social-link">
              <i className="fab fa-facebook-square"></i>
              </a>
            </li>
            <li>
              <a href="#" className="navbar-social-link">
              <i className="fab fa-pinterest-p"></i>
              </a>
            </li>
            <li>
              <a href="#" className="navbar-social-link">
              <i className="fab fa-instagram"></i>
              </a>
            </li>
            <li>
              <a href="#" className="navbar-social-link">
              <i className="fab fa-youtube"></i>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default HeaderHome;
