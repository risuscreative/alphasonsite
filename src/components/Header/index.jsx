import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import SocialWidget from '../Widget/SocialWidget';
import Newsletter from '../Widget/Newsletter';
import './header.scss';
import ContactInfoWidget from '../Widget/ContactInfoWidget';
import Div from '../Div';
import DropDown from './DropDown';


export default function Header({ variant }) {
  const [isSticky, setIsSticky] = useState(false);
  const [sideHeaderToggle, setSideHeaderToggle] = useState(false);
  const [mobileToggle, setMobileToggle] = useState(false);
  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 0) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    });
  }, []);

  return (
    <>
      <header
        className={`cs-site_header cs-style1 ${
          variant ? variant : ''
        } cs-sticky_header ${isSticky ? 'cs-sticky_header_active' : ''}`}
      >
        <Div className="cs-main_header">
          <Div className="container">
            <Div className="cs-main_header_in">
              <Div className="cs-main_header_left">
                <Link className="cs-site_branding" to="/">
                  <img src="/images/logo.png" alt="Logo" />
                </Link>
              </Div>
              <Div className="cs-main_header_center">
                <Div className="cs-nav cs-primary_font cs-medium">
                  <ul
                    className="cs-nav_list"
                    style={{ display: `${mobileToggle ? 'block' : 'none'}` }}
                  >
                    <li>
                      <NavLink to="/" onClick={() => setMobileToggle(false)}>
                       Ana Sayfa
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="tasarimlar"
                        onClick={() => setMobileToggle(false)}
                      >
                      Tasarımlarımız 
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="hizmetler"
                        onClick={() => setMobileToggle(false)}
                      >
                        Hizmetlerimiz
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="iletisim"
                        onClick={() => setMobileToggle(false)}
                      >
                        
                        İletişim
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="hakkimizda"
                        onClick={() => setMobileToggle(false)}
                      >
                        Hakkımızda
                      </NavLink> 
                    </li>
                    <li>
                      <NavLink
                        to="sss"
                        onClick={() => setMobileToggle(false)}
                      >
                        S.S.S.
                      </NavLink>
                    </li>
                  </ul>
                  <span
                    className={
                      mobileToggle
                        ? 'cs-munu_toggle cs-toggle_active'
                        : 'cs-munu_toggle'
                    }
                    onClick={() => setMobileToggle(!mobileToggle)}
                  >
                    <span></span>
                  </span>
                </Div>
              </Div>
              <Div className="cs-main_header_right" style={{gap: "1rem"}}>
                <a target="_blank" href="https://bionluk.com/alphagraphicart">
                  <Div className="alpha-btn">
<svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="25px" height="25px" viewBox="0 0 16 16" preserveAspectRatio="xMidYMid meet">
 <g fill="#4a4898">
  <path d="M952.5 1997 c-120.6 -6 -227.5 -29.2 -325 -70.7 -159.7 -68 -284.7 -183.6 -360.3 -333 -18.5 -36.6 -30.1 -64.2 -42.2 -100.3 -6.5 -19.3 -7.3 -24.9 -4.4 -33.2 1.7 -5.2 6.9 -11.7 11.7 -14.6 1.7 -1.1 92.5 -32.7 201.7 -70.3 157.8 -54.2 199.8 -68.3 204.8 -68.7 7.7 -0.5 13.5 1.4 18.6 6.4 4.7 4.6 5.6 6.5 10.6 21.9 25.7 79.2 65.5 138.6 120.7 180.1 38.9 29.3 87 49.4 139.8 58.3 60.2 10.2 139.8 7 200.3 -7.9 81.9 -20.2 135.7 -62 154.7 -120.3 5.5 -17.1 7 -27.6 6.9 -49.2 0 -17.2 -0.3 -19.9 -2.6 -28.6 -3.8 -13.9 -8.1 -23.5 -15.8 -35.2 -26 -39.4 -80.5 -70.3 -165.8 -94.2 -33.4 -9.3 -69.5 -17.1 -118.2 -25.5 -83.3 -14.4 -168.8 -33.2 -235.4 -51.6 -176.9 -49 -303 -117 -383 -206.5 -69.1 -77.3 -106 -166.1 -117.2 -282.4 -2.5 -25.4 -2.5 -88.2 -0.1 -111.5 11.1 -106.3 47.9 -200.6 110.9 -284.2 32.4 -43 76.1 -86 121.8 -120 105.3 -78.1 242.3 -127.8 397 -143.8 67.4 -6.9 144.8 -7.9 206.5 -2.4 169.6 14.9 313.8 73.1 426 171.9 15.4 13.6 45.7 44.4 59.9 61 50 58.3 91.9 129.8 120.3 205.5 10.8 28.5 15.6 44.1 15.6 50.5 0.1 9.5 -5.5 19.4 -13.6 24.4 -4.5 2.7 -382.2 132.3 -387.3 132.9 -9.4 1 -20.9 -4.5 -26.4 -12.6 -1.5 -2.2 -4.4 -8.9 -6.4 -14.8 -40.8 -116.6 -109.7 -181.1 -212.6 -198.9 -40.5 -7 -101.7 -5.7 -150 3.1 -90.3 16.5 -150.5 57.4 -168.4 114.4 -10.6 33.4 -5.7 71 12.7 98.5 34.6 51.6 120.5 85.7 307.2 122 85.6 16.6 116.7 23.3 163 35 226.8 57.3 373.1 139.7 460.1 259.1 48.8 67.1 78.7 148.8 88.8 242.9 4.1 38.4 4.7 100.2 1.1 133 -14.2 132.9 -69.6 248.8 -163.9 343 -114.4 114.3 -276 186 -472.1 209.4 -18.5 2.2 -43.9 4.5 -69 6.1 -21.8 1.4 -98.9 2 -121 1z"/>
 </g>
</svg>
        </Div>
                </a>
                <a target="_blank" href="https://www.fiverr.com/alphagraphicart">
                  <Div className="alpha-btn">
                  <svg fill="#9ea1ad" width="25px" height="25px" viewBox="-2.5 -2 24 24" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin" class="jam jam-fiverr"><path d='M16.25 16.25v-10h-10v-.625c0-1.034.841-1.875 1.875-1.875H10V0H8.125A5.632 5.632 0 0 0 2.5 5.625v.625H0V10h2.5v6.25H0V20h8.75v-3.75h-2.5V10h6.285v6.25H10V20h8.75v-3.75h-2.5z'/><circle cx='14.375' cy='1.875' r='1.875'/></svg>
                  </Div>
                </a>
                <a target="_blank" href="https://bionluk.com/alphagraphicart">
                  <Div className="alpha-btn">
                  <svg version="1.1" id="katman_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" height="25px" width="25px" fill="#9ea1ad"
	 viewBox="0 0 15 15" style={{enableBackground: "new 0 0 15 15"}}>
<path className="st0" d="M6.4,5.4c-0.8,0-1.1,0-1.6,0.2C4.5,5.6,4.2,5.7,4.2,5.7c0,0,0.7-4.7,0.8-5.1c0.1-0.2-0.1-0.2-1.5-0.2
	S2,0.4,2,0.4h0C2,0.5,1.5,3,1,6c-0.5,3.1-1,5.8-1,6.1c0,1.5,1.2,2.3,3.4,2.4c2.2,0.1,4.1-0.7,4.9-2.2c0.4-0.7,0.8-2.7,0.9-4.1
	c0.1-0.8,0-1-0.1-1.4C8.5,5.8,7.9,5.4,6.4,5.4z M5.6,11.2C5.3,11.7,4.8,12,4.1,12c-0.5,0-0.6,0-0.8-0.3l-0.2-0.3l0.3-1.5
	c0.3-1.7,0.4-1.9,1-2c0.4-0.1,0.9,0,1.2,0.1h0C5.8,8.2,6,8.5,6,8.9C6,9.3,5.7,10.8,5.6,11.2z"/>
<path className="st0" d="M12.7,3.8C14.1,4,15,3.2,15,1.9c0-0.7-0.1-1-0.5-1.3c-0.5-0.3-1.6-0.3-2.2,0h0c-0.5,0.3-0.8,0.8-0.9,1.6
	C11.4,3.3,11.7,3.7,12.7,3.8z"/>
<path className="st0" d="M13.6,5.8c-0.5-0.2-1.7-0.4-2.2-0.2c-0.5,0.1-1.2,0.5-1.2,0.8c0,0.1-0.1,0.6-0.1,1v0.8c0,0,0.5-0.1,0.5-0.1
	c0.5-0.1,0.8,0.1,0.8,0.5c0,0.3-0.2,1.4-0.5,2.9c-0.3,1.5-0.5,2.8-0.5,2.9c0,0.2,0.1,0.2,1.5,0.2l1.5,0l0.6-3.2
	c0.3-1.8,0.6-3.5,0.6-3.8C14.5,6.6,14.2,6.1,13.6,5.8z"/>
</svg>  

                  </Div>
                </a>
              </Div>
            </Div>
          </Div>
        </Div>
      </header>

      <Div
        className={
          sideHeaderToggle ? 'cs-side_header active' : 'cs-side_header'
        }
      >
        <button
          className="cs-close"
          onClick={() => setSideHeaderToggle(!sideHeaderToggle)}
        />
        <Div
          className="cs-side_header_overlay"
          onClick={() => setSideHeaderToggle(!sideHeaderToggle)}
        />
        <Div className="cs-side_header_in">
          <Div className="cs-side_header_shape" />
          <Link className="cs-site_branding" to="/">
            <img src="/images/logo.png" alt="Logo" />
          </Link>
          <Div className="cs-side_header_box">
            <h2 className="cs-side_header_heading">
              Do you have a project in your <br /> mind? Keep connect us.
            </h2>
          </Div>
          <Div className="cs-side_header_box">
            <ContactInfoWidget title="Contact Us" withIcon />
          </Div>
          <Div className="cs-side_header_box">
          </Div>
          <Div className="cs-side_header_box">
            <SocialWidget />
          </Div>

        </Div>
      </Div>
    </>
  );
}
