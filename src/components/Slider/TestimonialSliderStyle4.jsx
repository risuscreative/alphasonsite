import { Icon } from '@iconify/react';
import React from 'react';
import Slider from 'react-slick';
import Div from '../Div';
import TestimonialStyle2 from '../Testimonial/TestimonialStyle2';
const testimonialData = [
  {
    avatarImgUrl: '/images/discorelogo2.png',
    testimonialText:
      '2022 yılından beri hizmet aldığım kaliteli bir firma. DisCore olarak tüm tasarımsal ve grafiksel işleri Alpha ile yapıyoruz ve kullanıcı memnuniyetinde artış sağlıyoruz, tavsiye ederim.',
    avatarName: 'DisCore Community',
    avatarDesignation: 'Yazılım',
    ratings: '5',
  },
  {
    avatarImgUrl: '/images/jueznewlogo.png',
    testimonialText:
      'Öncelikle devamlı bir müşterileri olmaktan sürekli memnuniyet duyuyorum ,ciddi anlamda göze hitap edici işler çıkardıklarını da söylemeden geçmek olmaz tabii ki.',
    avatarName: 'Juez Community',
    avatarDesignation: 'Gaming',
    ratings: '5',
  },
  {
    avatarImgUrl: '/images/chirlesslogo2.png',
    testimonialText:
      'Bir gün içerisinde iki paketi bitirdi, yaptığı her detaydan sonra fikrimi istedi ve buna göre şekillendirdi. Rahatça samimi konuşabildiğim ve seri grafikerlerden.',
    avatarName: 'Vatan Roleplay',
    avatarDesignation: 'Gaming',
    ratings: '4.5',
  },
  {
    avatarImgUrl: '/images/tweperlogo2.png',
    testimonialText:
      'İkinci kez tekrar logo yaptırdım ve tam istediğim gibi kaliteli oldu markamı mükemmel temsil ediyor düşünmeden sipariş verebilirsiniz.',
    avatarName: 'Tweper',
    avatarDesignation: 'Sosyal Ağ',
    ratings: '5',
  },
  {
    avatarImgUrl: '/images/vietraturuncu2.png',
    testimonialText:
      'İlk defa hizmet aldım ve aldığım hizmetten yardımcı olma duygusunu tam olarak aldığım için kalite tesadüf değildir notumu bırakıyorum.',
    avatarName: 'Vietra Roleplay',
    avatarDesignation: 'Gaming',
    ratings: '5',
  },
  {
    avatarImgUrl: '/images/kadirdoganlogo.png',
    testimonialText:
      'Siparişimi istediğimden daha fazlasını yaptığı için teşekkür ederim gerçekten hakkını veriyor.',
    avatarName: 'Kadir Doğan',
    avatarDesignation: 'Ticaret',
    ratings: '5',
  },
];

export default function TestimonialSliderStyle4() {
  /** Team Member Data **/

  /** Slider Settings **/
  const SlickArrowLeft = ({ currentSlide, slideCount, ...props }) => (
    <div
      {...props}
      className={
        'slick-prev slick-arrow' + (currentSlide === 0 ? ' slick-disabled' : '')
      }
      aria-hidden="true"
      aria-disabled={currentSlide === 0 ? true : false}
    >
      <Icon icon="bi:arrow-left" />
    </div>
  );
  const SlickArrowRight = ({ currentSlide, slideCount, ...props }) => (
    <div
      {...props}
      className={
        'slick-next slick-arrow' +
        (currentSlide === slideCount - 1 ? ' slick-disabled' : '')
      }
      aria-hidden="true"
      aria-disabled={currentSlide === slideCount - 1 ? true : false}
    >
      <Icon icon="bi:arrow-right" />
    </div>
  );
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    prevArrow: <SlickArrowLeft />,
    nextArrow: <SlickArrowRight />,
    responsive: [
      {
        breakpoint: 1199,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 575,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <Slider {...settings} className="cs-gap-24 cs-arrow_style2">
      {testimonialData.map((item, index) => (
        <Div key={index}>
          <TestimonialStyle2 {...item} />
        </Div>
      ))}
    </Slider>
  );
}
