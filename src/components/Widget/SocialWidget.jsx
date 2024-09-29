import React from 'react'
import { Link } from 'react-router-dom'
import { Icon } from '@iconify/react';
import Div from '../Div';

export default function SocialWidget() {
  return (
    <Div className="cs-social_btns cs-style1">
      <Link to='https://fiverr.com/alphagraphicart' className="cs-center">
        <Icon icon="jam:fiverr" />
      </Link>
      <Link to='https://behance.net/alphaartworks' className="cs-center">
        <Icon icon="fa6-brands:behance" />               
      </Link>
      <Link to='https://discord.gg/7Q7EbNKHha' className="cs-center">
        <Icon icon="pajamas:discord" />              
      </Link>
      <Link to='https://instagram.com/alphagraphicart' className="cs-center">
        <Icon icon="fa6-brands:instagram" />
      </Link>
    </Div>
  )
}
