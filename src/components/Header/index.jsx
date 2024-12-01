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
<svg version="1.0" xmlns="http://www.w3.org/2000/svg"
 width="22.000000pt" height="22.000000pt" viewBox="0 0 25.000000 25.000000"
 preserveAspectRatio="xMidYMid meet">

<g transform="translate(0.000000,25.000000) scale(0.100000,-0.100000)"
fill="#000000" stroke="none">
<path d="M66 228 c-13 -13 -27 -32 -30 -44 -10 -32 27 -72 77 -81 32 -7 42
-13 42 -28 0 -26 -31 -31 -55 -10 -13 12 -28 15 -45 11 -32 -8 -31 -16 1 -47
35 -33 113 -34 145 -2 25 24 30 73 10 97 -7 8 -35 20 -62 26 -37 9 -49 16 -47
29 4 21 32 26 50 7 17 -16 58 -11 58 8 -1 52 -98 75 -144 34z"/>
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
<svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="25px" height="25px" viewBox="0 0 25 25" preserveAspectRatio="xMidYMid meet">
 <g fill="#f5f5f9">
  <path d="M0 12.5 l0 -12.5 6 0 c4.7 0 6 0.3 6 1.5 0 0.8 0.5 1.5 1 1.5 0.6 0 1 -0.7 1 -1.5 0 -1.2 1.3 -1.5 5.5 -1.5 l5.5 0 0 12.5 0 12.5 -5 0 c-3.8 0 -5 -0.4 -5 -1.5 0 -0.8 -0.9 -1.5 -2 -1.5 -1.1 0 -2 0.7 -2 1.5 0 1.2 -1.3 1.5 -5.5 1.5 l-5.5 0 0 -12.5z"/>
 </g>
 <g fill="#908fc0">
 </g>
 <g fill="#4c4a99">
  <path d="M7.5 23.8 c-2.2 -1.2 -4.5 -3.7 -4.5 -5 0 -0.5 1.2 -1.3 2.7 -1.9 2.1 -0.8 2.8 -0.7 3.5 0.6 1.2 2 6.8 2 6.8 0 0 -0.8 -1.2 -1.7 -2.7 -2.1 -8.1 -1.7 -11 -4.7 -9.7 -10 1.4 -5.4 11.6 -7.3 15.9 -2.9 1.4 1.3 2.5 2.8 2.5 3.3 0 1.5 -5.1 2.5 -6.3 1.3 -1.5 -1.5 -6 -1.4 -5.5 0.1 0.2 0.6 2.6 1.9 5.3 2.7 6.2 2 8.5 5.3 6.6 9.8 -2 4.8 -9.5 6.9 -14.6 4.1z"/>
 </g>
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
