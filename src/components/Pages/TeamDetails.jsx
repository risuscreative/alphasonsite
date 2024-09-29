import React, { useEffect } from 'react'
import { pageTitle } from '../../helper'
import Cta from '../Cta'
import PageHeading from '../PageHeading'
import Div from '../Div'
import Spacing from '../Spacing'
import SocialWidget from '../Widget/SocialWidget'

export default function TeamDetails() {
  pageTitle('Team Member');
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <>
      <PageHeading 
        title='Biz Kimiz?'
        bgSrc='/images/arka4.png'
        pageLinkText='Hakkımızda'
      />
      <Spacing lg='150' md='80'/>
      <Div className="container">
        <Div className="row align-items-center">
          <Div className="col-xl-5 col-lg-6">
            <Div className="cs-radius_15 cs-shine_hover_1">
              <img src="/images/hak.png" alt="Member" className="w-100" />
            </Div>
          </Div>
          <Div className="col-lg-6 offset-xl-1">
            <Spacing lg='0' md='45'/>
            <Div className="cs-section_heading cs-style1">
              <h2 className="cs-section_title">Alpha Artworks</h2>
              <Div className="cs-height_10 cs-height_lg_10" />
              <h3 className="cs-section_subtitle">Grafik Tasarımcısı</h3>
              <Div className="cs-height_5 cs-height_lg_5" />
              <Div className="cs-separator cs-accent_bg" />
              <Div className="cs-height_45 cs-height_lg_25" />
              <p className="cs-m0">Alpha Artworks, beklentilerinizi 
karşılayarak sizi veya firmanızı
amacına uygun olarak temsil
edecek en ideal çalışmayı hazırlar.
              </p>
              <Div className="cs-height_25 cs-height_lg_20" />
              <p className="cs-m0">2021 yılından bu yana sürdürdüğümüz misyon,
değerli müşterilerimize en iyi hizmeti sunarak
markalarını ön plana çıkarmaktır.

Vizyonumuz, elde ettiğimiz yüksek müşteri 
memnuniyeti ile global düzeyde de hizmet 
sunarak, sektördeki liderliğimizi pekiştirmektir. 
</p>
              <Div className="cs-height_45 cs-height_lg_30" />
              <SocialWidget/>
            </Div>
          </Div>
        </Div>
      </Div>
      <Spacing lg='150' md='80'/>
      <Div className="container">
      <Cta
          title="Markanızı bizimle <br />büyütmeye ne dersiniz?"
          btnText="Şimdi Başla!"
          btnLink="/iletisim"
          bgSrc="/images/ctabg.png"
        />
      </Div>
    </>
  )
}
