import React from 'react';
import { Link } from 'react-router-dom';
import VerticalLinks from '../VerticalLinks';
import parse from 'html-react-parser';

export default function Hero8({
  title,
  subtitle,
  btnLink,
  btnText,
  bgImageUrl,
  socialLinksHeading,
  heroSocialLinks,
  bannerHighlightText,
  spiningCircleUrl,
}) {
  return (
    <div
      className="cs-hero cs-style3 cs-type1 cs-bg cs-fixed_bg cs-shape_wrap_1"
      style={{ backgroundImage: `url(${bgImageUrl})` }}
      id="home"
    >
      <div className="container">
        <div className="cs-hero_text">
          <h1 className="cs-hero_title">{parse(title)}</h1>
          <div className="cs-hero_subtitle">{parse(subtitle)}</div>
          <Link to={btnLink} className="cs-btn cs-style1 cs-type1">
            <span>{btnText}</span>
          </Link>
        </div>
      </div>
      <div className="cs-hero_highlite cs-primary_color cs-accent_color cs-center">
        <svg style={{ width: "145px", marginLeft: "2px"}} xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 2000 2000">
          <g>
            <g id="katman_1">
              <g>
                <path style={{ fill: "#7861ff" }} class="cls-1" d="M1844.81,1286.93l-197.32-312.72-80.93,146.01c-42.35,76.4-39.8,169.79,6.66,243.77l33.5,53.34c15.9,25.31,15.88,57.49-.04,82.79l-46.7,74.18c-30.5,48.45-101.13,48.45-131.63,0l-362.54-575.91c-30.5-48.45-101.13-48.45-131.63,0l-362.53,575.91c-30.5,48.45-101.13,48.45-131.63,0l-46.7-74.18c-15.92-25.3-15.94-57.48-.04-82.79l33.5-53.34c46.46-73.98,49.01-167.36,6.66-243.77l-80.93-146.01-197.32,312.72c-57.81,91.61-57.87,208.28-.16,299.95l30.82,48.95h-.02s141.08,224.12,141.08,224.12c51.49,81.81,141.39,131.45,238.05,131.45h0c26.74,0,51.61-13.74,65.84-36.38l303.35-482.58c30.49-48.51,101.19-48.51,131.68,0l303.35,482.58c14.23,22.64,39.1,36.38,65.84,36.38h0c96.67,0,186.56-49.64,238.05-131.45l141.08-224.14h-.02s30.82-48.94,30.82-48.94c57.71-91.67,57.65-208.34-.16-299.95Z" />
                <path style={{ fill: "#7861ff" }} class="cls-1" d="M928.97,1630.23l-137.5,238.15c-31.57,54.68,7.89,123.03,71.03,123.03h274.99c63.14,0,102.6-68.35,71.03-123.03l-137.49-238.15c-31.57-54.68-110.49-54.68-142.06,0Z" />
                <path style={{ fill: "#7861ff" }} class="cls-1" d="M589.56,1104.23l344.6-548.2c30.49-48.51,101.19-48.51,131.68,0l344.6,548.2,81.55-147.11c42.34-76.38,39.8-169.74-6.62-243.7L1065.87,45.02c-30.48-48.57-101.26-48.57-131.74,0l-419.49,668.4c-46.42,73.97-48.96,167.33-6.62,243.7l81.55,147.11Z" />
              </g>
            </g>
          </g>
        </svg>
        <div className="cs-round_img cs-center">
          <img src={spiningCircleUrl} alt="Circle" />
        </div>
      </div>
      <VerticalLinks
        data={heroSocialLinks}
        title={socialLinksHeading}
        variant="cs-left_side"
      />
    </div>
  );
}
