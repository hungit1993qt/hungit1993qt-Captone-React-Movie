import React, { useState, useRef, useEffect } from "react";
import payFooter from "Playground/images/footer-bottom-img.png";
import styles from "Playground/SCSS/Footer.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

type Props = {};

const FooterHome = (props: Props) => {
  const [backTop, setBackTop] = useState(false);
  useEffect(() => {
    const onscrollBackTop = () => {
      if (window.scrollY > 500) {
        setBackTop(true);
      } else {
        setBackTop(false);
      }
    };
    window.addEventListener("scroll", onscrollBackTop);
  }, []);

  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="container">
          <div className="footer-brand-wrapper">
            <a href="./index.html" className="logo">
              <img className='imgLogo' src="../../logo.png" alt="Filmlane logo" />
            </a>
            <ul className="footer-list">
              <li>
                <a href="./index.html" className="footer-link">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Movie
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  TV Show
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Web Series
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Pricing
                </a>
              </li>
            </ul>
          </div>
          <div className="divider" />
          <div className="quicklink-wrapper">
            <ul className="quicklink-list">
              <li>
                <a href="#" className="quicklink-link">
                  Faq
                </a>
              </li>
              <li>
                <a href="#" className="quicklink-link">
                  Help center
                </a>
              </li>
              <li>
                <a href="#" className="quicklink-link">
                  Terms of use
                </a>
              </li>
              <li>
                <a href="#" className="quicklink-link">
                  Privacy
                </a>
              </li>
            </ul>
            <ul className="social-list">
              <li>
                <a href="#" className="social-link">
                <i className="fab fa-facebook-square"></i>
                </a>
              </li>
              <li>
                <a href="#" className="social-link">
                <i className="fab fa-twitter-square"></i>
                </a>
              </li>
              <li>
                <a href="#" className="social-link">
                <i className="fab fa-pinterest-p"></i>
                </a>
              </li>
              <li>
                <a href="#" className="social-link">
                <i className="fab fa-linkedin"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <p className="copyright">
            © 2022 <a href="#">Code30T</a>. All Rights Reserved
          </p>
          <img src={payFooter} alt="Online banking companies logo" className="footer-bottom-img"></img>
        </div>
      </div>
      <a
        href="#top"
        className={backTop ? "go-top active" : "go-top"}
        data-go-top
      >
        <FontAwesomeIcon color="black" size="2x" icon={faArrowUp} />
      </a>
    </footer>
  );
};

export default FooterHome;
