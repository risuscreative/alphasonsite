import React from 'react'
import { Icon } from '@iconify/react';

export default function ContactInfoWidget({withIcon, title}) {
  return (
    <>
      {title && <h2 className="cs-widget_title">{title}</h2>}
      <ul className="cs-menu_widget cs-style1 cs-mp0">
      <li>
          {withIcon?<span className='cs-accent_color'><Icon icon="jam:fiverr" /></span>:''}
          fiverr.com/alphagraphicart
        </li>
        <li>
          {withIcon?<span className='cs-accent_color'>
            <svg version="1.1" id="katman_1" xmlns="http://www.w3.org/2000/svg" x="-1px" y="0px" height="20px" width="22px" fill="#7861ff"
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
</svg>  </span>:''}
alphaartworks
        </li>
        <li>
          {withIcon?<span className='cs-accent_color'>
            <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
 width="25.000000pt" height="25.000000pt" viewBox="0 0 25.000000 25.000000"
 preserveAspectRatio="xMidYMid meet">

<g transform="translate(0.000000,25.000000) scale(0.100000,-0.100000)"
fill="#000000" stroke="none">
<path d="M66 228 c-13 -13 -27 -32 -30 -44 -10 -32 27 -72 77 -81 32 -7 42
-13 42 -28 0 -26 -31 -31 -55 -10 -13 12 -28 15 -45 11 -32 -8 -31 -16 1 -47
35 -33 113 -34 145 -2 25 24 30 73 10 97 -7 8 -35 20 -62 26 -37 9 -49 16 -47
29 4 21 32 26 50 7 17 -16 58 -11 58 8 -1 52 -98 75 -144 34z"/>
</g>
</svg>  </span>:''}
alphaartworks
        </li>
        <li>
          {withIcon?<span className='cs-accent_color'><Icon icon="mdi:email" /></span>:''}
          destek.alphagrafik@gmail.com
        </li>
        <li>
          {withIcon?<span className='cs-accent_color'><Icon icon="mdi:instagram" /></span>:''}
          @alphagraphicart
        </li>
        <li>
          {withIcon?<span className='cs-accent_color'><Icon icon="mdi:behance" /></span>:''}
          behance.net/alphagrafik
        </li>
        
      </ul>
      
    </>
  )
  
}
