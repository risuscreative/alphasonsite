import React from 'react'
import Div from '../Div'
import ContactInfoWidget from '../Widget/ContactInfoWidget'
import MenuWidget from '../Widget/MenuWidget'
import Newsletter from '../Widget/Newsletter'
import SocialWidget from '../Widget/SocialWidget'
import TextWidget from '../Widget/TextWidget'
import './footer.scss'

export default function Footer({copyrightText, logoSrc, logoAlt, text}) {
  const copyrightLinks = [
    {
      title: 'Sıkça Sorulan Sorular',
      href: '/sss'
    },
    {
      title: 'Sipariş Süreci',
      href: '/sss'
    }
  ]
  
  const serviceMenu = [
    {
      title: 'Ana Sayfa',
      href: '/'
    },
    {
      title: 'Tasarımlar',
      href: '/tasarimlar'
    },
    {
      title: 'Hizmetler',
      href: '/hizmetler'
    },
    {
      title: 'Hakkımızda',
      href: '/hakkimizda'
    },
  ]
  const servMenu = [
    {
      title: 'Logo Tasarımı',
      href: '/hizmetler'
    },
    {
      title: 'Kurumsal Kimlik',
      href: '/hizmetler'
    },
    {
      title: 'Gaming & Yayıncı Paket',
      href: '/hizmetler'
    },
    {
      title: 'Konu Tasarımı',
      href: '/hizmetler'
    },
  ]


  return (
    <footer className="cs-fooer">
      <Div className="cs-fooer_main">
        <Div className="container">
          <Div className="row">
            <Div className="col-lg-3 col-sm-6">
              <Div className="cs-footer_item">
                <TextWidget 
                  logoSrc='/images/logo.png' 
                  logoAlt='Logo'
                  text ='Alpha Artworks olarak 2021 yılından beri markanızı baştan tasarlıyoruz. '
                />
                <SocialWidget/>
              </Div>
            </Div>
            <Div className="col-lg-3 col-sm-6" style={{display: "flex", justifyContent: "center"}}>
              <Div className="cs-footer_item">
                <MenuWidget menuItems={serviceMenu} menuHeading='Sayfalar'/>
              </Div>
              </Div>
            <Div className="col-lg-3 col-sm-6">
              <Div className="cs-footer_item">
                <MenuWidget menuItems={servMenu} menuHeading='Hizmetler'/>
              </Div>
            </Div>
            <Div className="col-lg-3 col-sm-6">
              <Div className="cs-footer_item">
                <a href="https://discord.gg/7Q7EbNKHha"><img src="https://discordapp.com/api/guilds/908793841950261350/widget.png?style=banner4" alt="Discord Banner 4"/> </a>
              </Div>
            </Div>
          </Div>
        </Div>
      </Div>
      <Div className="container">
        <Div className="cs-bottom_footer">
          <Div className="cs-bottom_footer_left">
            <Div className="cs-copyright">Copyright © 2024 Alpha Graphic Art. Tüm hakları saklıdır.</Div>
          </Div>
          <Div className="cs-bottom_footer_right">
            <MenuWidget menuItems={copyrightLinks} variant=' cs-style2'/>
          </Div>
        </Div>
      </Div>
    </footer>
  )
}
