import { Icon } from '@iconify/react';
import React, { useEffect } from 'react';
import { pageTitle } from '../../helper';
import Accordion from '../Accordion';
import Button from '../Button';
import Cta from '../Cta';
import Div from '../Div';
import PageHeading from '../PageHeading';
import Spacing from '../Spacing';

export default function FaqPage() {
  pageTitle('S.S.S.');
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <PageHeading
        title="Sıkça Sorulan Sorular"
        bgSrc="/images/arka5.png"
        pageLinkText="S.S.S."
      />
      <Spacing lg="150" md="80" />
      <Div className="container">
        <Div className="row">
          <Div className="col-lg-4">
            <Div className="cs-faq_nav cs-radius_15">
              <h2 className="cs-faq_nav_title cs-m0">Soru Kategorileri</h2>
              <Div className="cs-height_30 cs-height_lg_30" />
              <ul className="cs-list cs-style1 cs-mp0">
                <li>
                  <Button
                    variant="cs-type2"
                    btnLink="/sss"
                    btnText="Sipariş Süreci"
                    icon={
                      <Icon icon="material-symbols:content-copy-outline-rounded" />
                    }
                  />
                </li>
                <li>
                  <Button
                    variant="cs-type2"
                    btnLink="/sss"
                    btnText="Ödeme İşlemleri"
                    icon={
                      <Icon icon="material-symbols:content-copy-outline-rounded" />
                    }
                  />
                </li>
                <li>
                  <Button
                    variant="cs-type2"
                    btnLink="/sss"
                    btnText="Teslim Süreci"
                    icon={
                      <Icon icon="material-symbols:content-copy-outline-rounded" />
                    }
                  />
                </li>
                <li>
                  <Button
                    variant="cs-type2"
                    btnLink="/iletisim"
                    btnText="Destek Süreci"
                    icon={
                      <Icon icon="material-symbols:content-copy-outline-rounded" />
                    }
                  />
                </li>
              </ul>
            </Div>
          </Div>
          <Div className="col-lg-7 offset-lg-1">
            <Spacing lg="0" md="40" />
            <Accordion />
          </Div>
        </Div>
      </Div>
      <Spacing lg="150" md="80" />
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
