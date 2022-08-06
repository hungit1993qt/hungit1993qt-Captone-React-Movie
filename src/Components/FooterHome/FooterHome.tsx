import React from 'react'

type Props = {}

const FooterHome = (props: Props) => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="container">
          <div className="footer-brand-wrapper">
            <a className="logo">
              <img className='imgLogo' src="../../logo.png" alt="Filmlane logo" />
            </a>
            <ul className="footer-list">
              <li>
                <a href="./index.html" className="footer-link">Home</a>
              </li>
              <li>
                <a href="#" className="footer-link">Movie</a>
              </li>
              <li>
                <a href="#" className="footer-link">TV Show</a>
              </li>
              <li>
                <a href="#" className="footer-link">Web Series</a>
              </li>
              <li>
                <a href="#" className="footer-link">Pricing</a>
              </li>
            </ul>
          </div>
          <div className="divider" />
          <div className="quicklink-wrapper">
            <ul className="quicklink-list">
              <li>
                <a href="#" className="quicklink-link">Faq</a>
              </li>
              <li>
                <a href="#" className="quicklink-link">Help center</a>
              </li>
              <li>
                <a href="#" className="quicklink-link">Terms of use</a>
              </li>
              <li>
                <a href="#" className="quicklink-link">Privacy</a>
              </li>
            </ul>
            <ul className="social-list">
              <li>
                <a href="#" className="social-link">
                  {/* <ion-icon name="logo-facebook" /> */}
                </a>
              </li>
              <li>
                <a href="#" className="social-link">
                  {/* <ion-icon name="logo-twitter" /> */}
                </a>
              </li>
              <li>
                <a href="#" className="social-link">
                  {/* <ion-icon name="logo-pinterest" /> */}
                </a>
              </li>
              <li>
                <a href="#" className="social-link">
                  {/* <ion-icon name="logo-linkedin" /> */}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <p className="copyright">
            © 2022 <a href="#">codewithsadee</a>. All Rights Reserved
          </p>
          
        </div>
      </div>
    </footer>
  )
}

export default FooterHome