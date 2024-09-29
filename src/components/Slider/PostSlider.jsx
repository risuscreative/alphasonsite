import React from 'react';
import Slider from 'react-slick';
import Div from '../Div';
import Post from '../Post';
const postData = [
  {

    src: '/images/1.png',
    title: 'Yaratıcılık ve Yenilikçilik',
  },
  {

    src: '/images/2.png',
    title: 'Deneyim ve Uzmanlık',
  },
  {

    src: '/images/3.png',
    title: 'Sonuç Odaklı Hizmet',
  },
  {

    src: '/images/4.png',
    title: 'Hızlı ve Güvenilir Teslimat',
  },
  {

    src: '/images/5.png',
    title: 'Müşteri Memnuniyeti',
  },
];

export default function PostSlider() {
  /** Slider Settings **/
  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 4000,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <Slider {...settings} className="cs-gap-24">
      {postData.map((item, index) => (
        <Div key={index}>
          <Post
            url={item.url}
            src={item.src}
            alt={item.alt}
            date={item.date}
            title={item.title}
          />
        </Div>
      ))}
    </Slider>
  );
}
