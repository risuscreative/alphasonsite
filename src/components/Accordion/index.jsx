import React from 'react'
import { useState } from 'react'
import Div from '../Div'

export default function Accordion() {
  const [selected, setSelected] = useState(0)
  const handelToggle = (index) => {
    if(selected === index) {
      return setSelected(null)
    }
    setSelected(index)
  }
  const accordionData = [
    {
      question: 'Nasıl sipariş verebilirim?',
      answer: 'Instagram hesabımızdan, Discord sunucumuzdan veya güvenli ödeme kolaylığı ile Bionluk veya Fiverr mağazamızdan sipariş verebilirsiniz.'
    },
    {
      question: 'Ödeme nasıl alınıyor?',
      answer: 'Freelance olarak yapılan ödeme işlemleri para transfer yoluyla veya güvenli ödeme ile yapılmaktadır.'
    },
    {
      question: 'Siparişlerin teslimi kaç gün sürüyor?',
      answer: 'Genellikle 1-4 gün içerisinde teslim edilen siparişiniz yoğunluğa bağlı olarak değişebilmektedir. Gecikme durumunda telafi yapılmaktadır.'
    },
    {
      question: 'Destek konusunda nasıl bir hizmet veriliyor?',
      answer: 'Siparişinizi vermek istediğiniz andan itibaren sizlere 7/24 hızlı destek sunuyoruz. Siparişiniz teslim edildikten sonra herhangi bir sorun yaşadığınızda bizlere ulaşabilirsiniz.'
    },
    {
      question: 'Fiyatlarda indirim oluyor mu?',
      answer: 'Belirli günlerde fiyatlarımızda indirimler olmaktadır.'
    },
  ]
  return (
    <Div className="cs-accordians cs-style1">
      {accordionData.map((item, index)=>(
        <Div className={`cs-accordian ${selected===index?'active':''}`} key={index}>
          <Div className="cs-accordian_head" onClick={()=>handelToggle(index)}>
            <h2 className="cs-accordian_title">{item.question}</h2>
            <span className="cs-accordian_toggle cs-accent_color">
              <svg width={15} height={8} viewBox="0 0 15 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 0L7.5 7.5L15 0H0Z" fill="currentColor" />
              </svg>                    
            </span>
          </Div>
          <Div className='cs-accordian_body'>
            <Div className="cs-accordian_body_in">{item.answer}</Div>
            </Div>
        </Div>
      ))}
    </Div>
  )
}