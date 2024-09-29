import React, { useEffect, useState } from 'react';
import Card from '../Card';
import FunFact from '../FunFact';
import Hero from '../Hero';import Hero8 from '../Hero/Hero8';import Div from '../Div';
import SectionHeading from '../SectionHeading';
import Spacing from '../Spacing';
import Cta from '../Cta';
import LogoList from '../LogoList';
import MasonryGallery from '../Gallery/MasonryGallery';
import MovingText from '../MovingText';
import PostSlider from '../Slider/PostSlider';
import TestimonialSliderStyle4 from '../Slider/TestimonialSliderStyle4';
import TimelineSlider from '../Slider/TimelineSlider';
import { pageTitle } from '../../helper';
import { Icon } from '@iconify/react';
// Hero Social Links
const heroSocialLinks = [
  {
    name: 'Fiverr',
    links: 'https://www.fiverr.com/alphagraphicart?up_rollout=true',
  },
  {
    name: 'Bionluk',
    links: 'https://bionluk.com/alphagraphicart',
  },
];

// FunFact Data
const funfaceData = [
  {
    title: 'Mutlu Müşteri',
    factNumber: '500',
  },
  {
    title: 'Tamamlanan Proje',
    factNumber: '600',
  },
  {
    title: 'Yeni Katılanlar',
    factNumber: '200',
  },
  {
    title: 'Toplam Referans',
    factNumber: '550',
  },
];
const portfolioData = [
  {
    title: 'Colorful Art Work',
    subtitle: 'See Details',
    href: '/portfolio/portfolio-details',
    src: '/images/portfolio_1.jpeg',
  },
  {
    title: 'Colorful Art Work',
    subtitle: 'See Details',
    href: '/portfolio/portfolio-details',
    src: '/images/portfolio_2.jpeg',
  },
  {
    title: 'Colorful Art Work',
    subtitle: 'See Details',
    href: '/portfolio/portfolio-details',
    src: '/images/portfolio_0.jpg',
  },
  {
    title: 'Colorful Art Work',
    subtitle: 'See Details',
    href: '/portfolio/portfolio-details',
    src: '/images/portfolio_3.jpeg',
  },
];

export default function Home() {
  pageTitle('Ana Sayfa');
  const [active, setActive] = useState('all');
  const [itemShow, setItemShow] = useState(6);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Hero8
        title="Senin Vizyonun,<br>
        Bizim Yaratıcılığımız."
        
        subtitle="Alpha Artworks, beklentilerinizi karşılayarak sizi veya firmanızı <br> amacına uygun olarak temsil
edecek en ideal çalışmayı hazırlar."
        btnLink="https://bionluk.com/alphaartworks"
        btnText="Sipariş Oluştur"
        socialLinksHeading="Satın Al"
        heroSocialLinks={heroSocialLinks}
        bgImageUrl="/images/sitebg.png"
        bannerHighlightText="AW"
        spiningCircleUrl="/images/hero_img.svg"
      />


      {/* Start FunFact Section */}
      <Spacing lg="100" md="80" />
      <div className="container">
        <FunFact
          variant="cs-type1"
          title="Sayılarla Biz"
          subtitle="Her geçen gün artan müşteri sayımızla sizlere hizmet vermekten gurur duyuyoruz."
          data={funfaceData}
        />
      </div>
      {/* End FunFact Section */}
      {/* Start Blog Section */}
      <Spacing lg="90" md="80" />
      <Div className="cs-shape_wrap_4">
        <Div className="cs-shape_4"></Div>
        <Div className="cs-shape_4"></Div>
        <Div className="container">
          <Div className="row">
            <Div className="col-xl-4">
              <SectionHeading
                title="Neden Biz?"
                subtitle="5 Maddede" 
              />
              <Spacing lg="150" md="45" />
            </Div>
            <Div className="col-xl-7 offset-xl-1">
              <Div className="cs-half_of_full_width">
                <PostSlider />
              </Div>
            </Div>
          </Div>
        </Div>
      </Div>
      {/* End Blog Section */}
      {/* Start Service Section */}
      <Spacing lg="150" md="80" />
      <Div id="service">
        <Div className="container">
          <Div className="row">
            <Div className="col-xl-4">
            <SectionHeading
                title="Size <br>Verdiğimiz<br> Hizmetler"
                subtitle=""
                btnText="Tümünü Görüntüle"
                btnLink="/hizmetler"
              />
              <Spacing lg="90" md="45" />
            </Div>
            <Div className="col-xl-8">
              <Div className="row">
                <Div className="col-lg-3 col-sm-6 cs-hidden_mobile"></Div>
                <Div className="col-lg-3 col-sm-6">
                  <Card
                    title="Logo Tasarımı"
                    link="/service/service-details"
                    src="/images/card1.png"
                    alt="Service"
                  />
                  <Spacing lg="0" md="30" />
                </Div>
                <Div className="col-lg-3 col-sm-6 cs-hidden_mobile"></Div>
                <Div className="col-lg-3 col-sm-6">
                  <Card
                    title="Konu Tasarımı"
                    link="/service/service-details"
                    src="/images/card2.png"
                    alt="Service"
                  />
                  <Spacing lg="0" md="30" />
                </Div>
                <Div className="col-lg-3 col-sm-6">
                  <Card
                    title="Kurumsal Kimlik"
                    link="/service/service-details"
                    src="/images/card3.png"
                    alt="Service"
                  />
                  <Spacing lg="0" md="30" />
                </Div>
                <Div className="col-lg-3 col-sm-6 cs-hidden_mobile"></Div>
                <Div className="col-lg-3 col-sm-6">
                  <Card
                    title="Yayıncı Paketleri"
                    link="/service/service-details"
                    src="/images/card4.png"
                    alt="Service"
                  />
                  <Spacing lg="0" md="30" />
                </Div>
                <Div className="col-lg-3 col-sm-6 cs-hidden_mobile"></Div>
              </Div>
            </Div>
          </Div>
        </Div>
      </Div>
      {/* End Service Section */}

      {/* Start Gallery Section */}
      <Spacing lg="145" md="80" />
      <MasonryGallery />
      {/* End Gallery Section */}


      {/* Start Testimonial Section */}
      <section>
        <div className="cs-height_145 cs-height_lg_140" />
        <div className="container">
          <SectionHeading
            title="Müşterilerimiz neler söyledi?"
            subtitle="Müşteri Yorumları"
          />
          <div className="cs-height_90 cs-height_lg_45" />
          <TestimonialSliderStyle4 />
        </div>
        <div className="cs-height_10 cs-height_lg_80" />
      </section>
      {/* End Testimonial Section */}
      {/* Start MovingText Section */}
      <MovingText text="2021'den Beri Sınırsız Hizmet-" variant="cs-type2" />
      <Spacing lg="10" md="70" />
      {/* End MovingText Section */}

      {/* Start CTA Section */}
      <Div className="container">
      <Spacing lg="150" md="80" />
        <Cta
          title="Markanızı bizimle <br />büyütmeye ne dersiniz?"
          btnText="Şimdi Başla!"
          btnLink="/iletisim"
          bgSrc="/images/ctabg.png"
        />
      </Div>
      {/* End CTA Section */}
    </>
  );
}
