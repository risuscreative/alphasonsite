import { Icon } from '@iconify/react';
import React, { useState } from 'react';
import Div from '../Div';
import SectionHeading from '../SectionHeading';
import Spacing from '../Spacing';
import ModalImage from 'react-modal-image';

export default function MasonryGallery() {
  const [active, setActive] = useState('all');
  const [itemShow, setItemShow] = useState(12);

  const portfolioData = [
    {
      title: 'Reklam Dünyası',
      subtitle: 'Logo Tasarımı',
      href: '/portfolio/portfolio-details',
      src: '/images/rd1.png',
      srcLg: '/images/rd1.png',
      category: 'kurumsal',
      height: 450,
    },
    {
      title: 'Vietra Roleplay',
      subtitle: 'Logo Tasarımı',
      href: '/portfolio/portfolio-details',
      src: '/images/vt.png',
      srcLg: '/images/vt.png',
      category: 'gaming',
      height: 450,
    },  
    {
      title: 'Smart Pour',
      subtitle: 'Logo Tasarımı',
      href: '/portfolio/portfolio-details',
      src: '/images/sm1.png',
      srcLg: '/images/sm1.png', 
      category: 'kurumsal',
      height: 450,
    },
    {
      title: 'Ales Network',
      subtitle: 'Logo Tasarımı',
      href: '/portfolio/portfolio-details',
      src: '/images/al.png',
      srcLg: '/images/al.png',
      category: 'gaming',
      height: 450,
    },
    {
      title: 'Alpha Akademi',
      subtitle: 'Logo Tasarımı',
      href: '/portfolio/portfolio-details',
      src: '/images/ak.png',
      srcLg: '/images/ak.png',
      category: 'kurumsal',
      height: 450,
    },
    {
      title: 'KonrulV',
      subtitle: 'Logo Tasarımı',
      href: '/portfolio/portfolio-details',
      src: '/images/kn.png',
      srcLg: '/images/kn.png',
      category: 'gaming',
      height: 450,
    },

    {
      title: 'Nova',
      subtitle: 'Logo Tasarımı',
      href: '/portfolio/portfolio-details',
      src: '/images/nv1.png',
      srcLg: '/images/nv1.png',
      category: 'kurumsal',
      height: 450,
    },
    {
      title: 'Holy Roleplay',
      subtitle: 'Logo Tasarımı',
      href: '/portfolio/portfolio-details',
      src: '/images/hl.png',
      srcLg: '/images/hl.png',
      category: 'gaming',
      height: 450,
    },





  ];
  const categoryMenu = [
    {
      title: 'Oyuncu Özel',
      category: 'gaming',
    },
    {
      title: 'Kurumsal',
      category: 'kurumsal',
    }
  ];
  return (
    <>
      <Div className="container">
        <Div className="cs-portfolio_1_heading">
          <SectionHeading title="Yapılan Bazı Çalışmalar" subtitle="Portfolyo" />
          <Div className="cs-filter_menu cs-style1">
            <ul className="cs-mp0 cs-center">
              <li className={active === 'all' ? 'active' : ''}>
                <span onClick={() => setActive('all')}>Tümü</span>
              </li>
              {categoryMenu.map((item, index) => (
                <li
                  className={active === item.category ? 'active' : ''}
                  key={index}
                >
                  <span onClick={() => setActive(item.category)}>
                    {item.title}
                  </span>
                </li>
              ))}
            </ul>
          </Div>
        </Div>
      </Div>
      <Spacing lg="90" md="45" />
      <Div className="cs-masonry_4_col">
        {portfolioData.slice(0, itemShow).map((item, index) => (
          <Div
            className={`${
              active === 'all'
                ? ''
                : !(active === item.category)
                ? 'd-none'
                : ''
            }`}
            key={index}
          >
            <Div
              className="cs-portfolio cs-style1 cs-type2"
              style={{ height: `${item.height}px` }}
            >
              <Div className="cs-lightbox_item">
                <ModalImage
                  small={item.src}
                  large={item.srcLg}
                  alt={item.title}
                />
              </Div>
              <Div className="cs-portfolio_hover" />
              <span className="cs-plus" />
              <Div
                className="cs-portfolio_bg cs-bg"
                style={{ backgroundImage: `url("${item.src}")` }}
              />
              <Div className="cs-portfolio_info">
                <Div className="cs-portfolio_info_bg cs-accent_bg" />
                <h2 className="cs-portfolio_title">{item.title}</h2>
                <Div className="cs-portfolio_subtitle">{item.subtitle}</Div>
              </Div>
            </Div>
          </Div>
        ))}
      </Div>
      <Div className="container">
        <Div className="text-center">
          {portfolioData.length <= itemShow ? (
            ''
          ) : (
            <>
              <Spacing lg="65" md="40" />
              <span
                className="cs-text_btn"
                onClick={() => setItemShow(itemShow + 4)}
              >
                <span>Daha Fazla</span>
                <Icon icon="bi:arrow-right" />
              </span>
            </>
          )}
        </Div>
      </Div>
    </>
  );
}