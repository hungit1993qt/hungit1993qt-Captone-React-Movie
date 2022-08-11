import React, { useState, useRef, useEffect } from "react";
import styles from "Playground/SCSS/Footer.module.scss";
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
      <div className="footer-bottom">
        <div className="container">
          <p className="copyright">
            © 2022 <a href="#">Code30T</a>. All Rights Reserved
          </p>
        </div>
      </div>
      <a
        href="#top"
        className={backTop ? "go-top active" : "go-top"}
        data-go-top
      >^</a>
    </footer>
  );
};

export default FooterHome;
