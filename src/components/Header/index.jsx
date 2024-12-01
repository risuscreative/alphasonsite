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
<path id="Fill-1" class="st0" d="M1077.41,769.69c-232.19-44.93-337.08-86.17-337.08-187.26c0-89.92,97.35-157.31,265.95-157.31
				c167.62,0,238.35,106.27,272.22,210.24c5.18,15.96,22.23,24.71,38.07,19.24l374.47-128.68c14.75-5.07,23.21-20.97,18.55-35.83
				C1613.21,181.63,1353.89,5.6,1002.52,5.6c-501.88,0-752.85,299.64-752.85,606.83c0,387.89,303.5,517.26,685.22,590.07
				c16.24,3.11,32.37,6.28,48.9,9.1c205.98,33.75,307.07,89.92,307.07,183.52c0,112.38-104.83,183.52-288.35,183.52
				c-184.55,0-291.75-100.92-337.54-254.83c-4.2-14.11-19.41-21.83-33.35-17.05l-393.19,135.07c-14.92,5.13-23.44,21.2-18.72,36.17
				c97.75,312.26,379.53,520.2,782.8,520.2c498.14,0,779.06-284.72,779.06-618.06C1781.58,998.07,1508.15,848.31,1077.41,769.69"/>
			<g id="Clip-21">
			</g>
		</g>
	</g>
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
