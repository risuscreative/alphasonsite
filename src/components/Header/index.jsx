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
                  <svg version="1.1" id="katman_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" height="25px" width="25px" fill="#9ea1ad"

<g transform="translate(0.000000,2000.000000) scale(0.100000,-0.100000)"
fill="#000000" stroke="none">
<path d="M9510 19934 c-30 -2 -136 -8 -235 -14 -1602 -97 -3043 -544 -4172
-1296 -1537 -1024 -2470 -2599 -2594 -4379 -15 -216 -6 -782 15 -995 113
-1110 459 -1963 1106 -2720 116 -136 404 -421 545 -539 989 -826 2369 -1408
4395 -1855 350 -77 916 -189 1242 -246 1052 -184 1647 -351 2158 -606 539
-270 831 -592 922 -1019 19 -89 16 -378 -5 -495 -127 -700 -677 -1188 -1602
-1419 -536 -134 -1271 -174 -1840 -101 -610 78 -1115 277 -1573 620 -151 112
-412 367 -532 519 -281 357 -490 759 -659 1272 -58 176 -87 221 -168 259 -105
50 33 93 -2118 -647 -1072 -369 -1977 -681 -2009 -694 -117 -43 -197 -151
-199 -268 -1 -43 12 -96 57 -231 269 -808 680 -1571 1189 -2207 358 -449 800
-881 1247 -1219 1166 -883 2621 -1422 4274 -1584 405 -39 533 -45 1081 -45
531 0 697 6 1075 41 1736 157 3229 687 4378 1553 277 209 459 369 707 622 938
955 1481 2135 1601 3479 20 221 22 713 5 960 -85 1201 -441 2152 -1109 2960
-124 149 -463 488 -622 620 -1084 902 -2677 1536 -4970 1980 -1584 306 -2250
485 -2790 746 -280 136 -441 245 -590 400 -191 198 -285 401 -311 674 -37 373
97 719 388 1001 384 373 973 594 1793 670 212 20 715 17 885 -5 464 -59 823
-186 1160 -411 408 -272 743 -691 984 -1233 43 -95 80 -192 177 -458 21 -58
77 -120 138 -152 43 -22 64 -26 131 -27 l80 0 1870 643 c1029 354 1898 657
1933 673 73 35 124 95 147 172 23 78 19 106 -41 290 -226 688 -547 1332 -943
1887 -232 326 -436 564 -737 860 -227 223 -383 357 -626 541 -981 739 -2213
1208 -3593 1368 -384 45 -535 53 -1070 56 -286 1 -545 1 -575 -1z"/>
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
