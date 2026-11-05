import dynamic from 'next/dynamic';

import Main from './Main';
import About from './About';
import Promotions from './Promotions';
import Partners from './Partners';

import HomeSectionFallback from '@/src/components/screens/educational-center/home/HomeSectionFallback';


const OurDailyLife = dynamic(() => import('./OurDailyLife'), {
    loading: () => <HomeSectionFallback />,
});


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

export default Home;
