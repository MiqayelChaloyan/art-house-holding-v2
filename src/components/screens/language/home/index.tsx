'use client'

import React from 'react';

import Main from './Main';
import About from './About';
import Promotions from './Promotions';
import OurDailyLife from './OurDailyLife';
import Partners from './Partners';


interface Props {
    data: HOME_DETALIS_LANGUAGE_QUERYResult;
    discounts: DISCOUNTS_QUERYResult;
    partners: PARTNER_Result[];
    locale: string;
};

const Home = ({ data, discounts, partners, locale }: Readonly<Props>) => (
    <>
        <Main />
        <About data={data} locale={locale} />
        <Promotions discounts={discounts} />
        <OurDailyLife locale={locale} data={data} />
        <Partners partners={partners} />
    </>
);

export default React.memo(Home);