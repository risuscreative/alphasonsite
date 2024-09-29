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
                <a target="_blank" href="https://discord.gg/7Q7EbNKHha">
                  <Div className="alpha-btn">
                    <svg stroke="#CFCFCF" fill="#9ea1ad" stroke-width="0" viewBox="0 0 16 16" height="25px" width="25px" xmlns="http://www.w3.org/2000/svg"><path d="M13.545 2.907a13.227 13.227 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.19 12.19 0 0 0-3.658 0 8.258 8.258 0 0 0-.412-.833.051.051 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.041.041 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032c.001.014.01.028.021.037a13.276 13.276 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019c.308-.42.582-.863.818-1.329a.05.05 0 0 0-.01-.059.051.051 0 0 0-.018-.011 8.875 8.875 0 0 1-1.248-.595.05.05 0 0 1-.02-.066.051.051 0 0 1 .015-.019c.084-.063.168-.129.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.052.052 0 0 1 .053.007c.08.066.164.132.248.195a.051.051 0 0 1-.004.085 8.254 8.254 0 0 1-1.249.594.05.05 0 0 0-.03.03.052.052 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.235 13.235 0 0 0 4.001-2.02.049.049 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.034.034 0 0 0-.02-.019Zm-8.198 7.307c-.789 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612Zm5.316 0c-.788 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612Z"></path></svg>
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
