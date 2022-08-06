import { useSelector, useDispatch } from 'react-redux'
import { RootState, AppDispatch } from "configStore";
import { logOut } from 'Slices/auth'
import { User } from 'Interface/user'
import Swal from 'sweetalert2'
//tsrafce
import { NavLink } from "react-router-dom";
import React, { Component, useEffect, useState } from 'react'
import stylesHeader from 'Playground/SCSS/Header.module.scss'
type Props = {};


const HeaderHome = (props: Props) => {
  const { auth } = useSelector(
    (state: RootState) => state.auth
  );
  const getLocalStorage: User = JSON.parse(localStorage.getItem("user") as string) || null;
  const dispatch = useDispatch<AppDispatch>()
  const Logout = () => {
    dispatch(logOut());
  }
  const Login = () => {

  }



  const [Active, setActive] = useState(false);
  return (
    <header className="header active">
      <div className="container">
        <div className="overlay" />
        <NavLink to="/" className={({ isActive }) => isActive ? "logo activeLink" : "logo"}>
          <img className='imgLogo' src="../../logo.png" alt="Filmlane logo" />
        </NavLink>
        <div className="header-actions">
          <h3 className={stylesHeader['title-user']}>{auth ? auth.hoTen : ""}</h3>
          <NavLink to={auth ? "/" : "login"}>
            <button
              onClick={() => { auth ? Logout() : Login() }}
              className="btn btn-primary">
              {getLocalStorage ? "LOG OUT" : "SIGN IN"}
            </button>
          </NavLink>
        </div>
        <button className={Active ? "menu-open-btn active" : "menu-open-btn"} onClick={() => setActive(!Active)} >
          <span className="one" ></span>
          <span className="two" ></span>
          <span className="three" ></span>
        </button>
        <nav className={Active ? "navbar active" : "navbar"}>

          <div className="navbar-top">
            <NavLink to="/" className="logo">
              <img className='imgLogo' src="../../logo.png" alt="Filmlane logo" />

            </NavLink>

            <button className={Active ? "menu-open-btn active" : "menu-open-btn"} onClick={() => setActive(!Active)} >
              <span className={Active ? "one active" : "one"} ></span>
              <span className={Active ? "two active" : "two"} ></span>
              <span className={Active ? "three active" : "three"} ></span>
            </button>
          </div>
          <ul className="navbar-list">
            <li className={stylesHeader["li-submenu"]}>
              <NavLink to={"contact"} className={({ isActive }) =>
                isActive ? "navbar-link activeLink" : "navbar-link"
              }><h3 className={stylesHeader['title-user']}>{auth ? auth.hoTen : ""}</h3></NavLink>
            </li>
            <li>
              <NavLink to={"/"} className={({ isActive }) =>
                isActive ? "navbar-link activeLink" : "navbar-link"
              }>Home</NavLink>
            </li>

            <li>
              <NavLink className={({ isActive }) =>
                isActive ? "navbar-link activeLink" : "navbar-link"
              }
                to={"about"}>About</NavLink>
            </li>
            <li>
              <NavLink to={"contact"} className={({ isActive }) =>
                isActive ? "navbar-link activeLink" : "navbar-link"
              }>Contact</NavLink>
            </li>

            <li className={stylesHeader["li-submenu"]}>
              <NavLink className="navbar-link" to={auth ? "/" : "login"}>
                <button
                  onClick={() => Logout()}
                  className={stylesHeader["btn-submenu"]}
                >
                  {getLocalStorage ? "LOG OUT" : "SIGN IN"}
                </button>
              </NavLink>
            </li>

          </ul>

          <ul className="navbar-social-list">
            <li>
              <a href="#" className="navbar-social-link">
                {/* <ion-icon className="logo-twitter" /> */}
              </a>
            </li>
            <li>
              <a href="#" className="navbar-social-link">
                {/* <ion-icon className="logo-facebook" /> */}
              </a>
            </li>
            <li>
              <a href="#" className="navbar-social-link">
                {/* <ion-icon className="logo-pinterest" /> */}
              </a>
            </li>
            <li>
              <a href="#" className="navbar-social-link">
                {/* <ion-icon className="logo-instagram" /> */}
              </a>
            </li>
            <li>
              <a href="#" className="navbar-social-link">
                {/* <ion-icon className="logo-youtube" /> */}
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>

  );
};

export default HeaderHome;
