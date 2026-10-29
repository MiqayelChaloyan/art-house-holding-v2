'use client';

import React from 'react';

import Layout from '@/src/lib/outlets/art-house/layout';

import Main from '@/src/components/screens/art-house/home/Main';
import Branches from '@/src/components/screens/art-house/home/Branches';
import Progress from '@/src/components/screens/art-house/home/Progress';
import Partners from '@/src/components/screens/art-house/home/Partners';


interface Props {
    data: HOME_DETALIS_QUERYResult;
    partners: PARTNER_Result[];
    socialData?: SOCIAL_QUERYResult;
};

const Home = ({ data, partners, socialData }: Readonly<Props>) => {
    return (
        <Layout headerPosition='fixed' socialData={socialData}>
            <Main />
            <Branches data={data?.our_websites} />
            <Progress data={data?.progress_section} />
            <Partners partners={partners} />
        </Layout>
    );
};

export default React.memo(Home);